import path from "path";
import stream from "stream";
import { fileURLToPath } from "url";

import _ from "lodash";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import { ESLint } from "eslint";
import gulpChange from "gulp-change";
import gulpConcat from "gulp-concat";
import gulpInjectString from "gulp-inject-string";
import gulpLess from "gulp-less";
import gulpRename from "gulp-rename";
import gulpStripComments from "gulp-strip-comments";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom ESLint function to replace gulp-eslint
 * Provides linting capabilities for Gulp streams
 */
function createEslintPlugin() {
  let eslint;

  return {
    /**
     * Lint files in a Gulp stream
     * @returns {stream.Transform} Transform stream that lints files
     */
    eslint: function () {
      return new stream.Transform({
        objectMode: true,
        transform: async function (file, encoding, callback) {
          if (file.isNull()) {
            return callback(null, file);
          }

          if (file.isStream()) {
            return callback(new Error("Streaming not supported"));
          }

          try {
            if (!eslint) {
              eslint = new ESLint({
                cwd: process.cwd(),
              });
            }

            const results = await eslint.lintText(file.contents.toString(), {
              filePath: file.path,
            });

            file.eslint = results[0] || {
              messages: [],
              errorCount: 0,
              warningCount: 0,
            };
            callback(null, file);
          } catch (error) {
            callback(error);
          }
        },
      });
    },

    /**
     * Format ESLint results
     * @returns {stream.Transform} Transform stream that formats results
     */
    format: function () {
      return new stream.Transform({
        objectMode: true,
        transform: async function (file, encoding, callback) {
          if (file.eslint) {
            try {
              if (!eslint) {
                eslint = new ESLint({
                  cwd: process.cwd(),
                });
              }
              const formatter = await eslint.loadFormatter("stylish");
              const output = formatter.format([file.eslint]);
              if (output) {
                console.log(output);
              }
            } catch (error) {
              console.error("ESLint formatting error:", error);
            }
          }
          callback(null, file);
        },
      });
    },

    /**
     * Fail the stream if ESLint found errors
     * @returns {stream.Transform} Transform stream that fails on errors
     */
    failAfterError: function () {
      return new stream.Transform({
        objectMode: true,
        transform: function (file, encoding, callback) {
          if (file.eslint && file.eslint.errorCount > 0) {
            const error = new Error(
              `ESLint found ${file.eslint.errorCount} error(s)`,
            );
            error.showStack = false;
            return callback(error);
          }
          callback(null, file);
        },
      });
    },
  };
}

/**
 * Build configuration options
 * @type {Object}
 */
const buildOptions = {
  supportImage: [true, false],
};

/**
 * ESLint plugin instance
 * @type {Object}
 */
const eslintPlugin = createEslintPlugin();

/**
 * Gulp plugins wrapper
 * Provides a consistent interface for accessing Gulp plugins
 */
export const plugins = {
  change: gulpChange,
  concat: gulpConcat,
  eslint: eslintPlugin,
  injectString: gulpInjectString,
  less: gulpLess,
  rename: gulpRename,
  stripComments: gulpStripComments,
  /**
   * Webpack plugin wrapper
   * @param {Object} arg - Webpack configuration
   * @returns {stream.Transform} Webpack stream
   */
  webpack: (arg) => {
    arg.mode = "none";
    return webpackStream(arg, webpack);
  },
};

/**
 * Source path utilities
 * Provides methods for resolving source paths
 */
export const source = {
  /**
   * Get the source root path
   * @returns {string} Absolute path to source root
   */
  get path() {
    return path.resolve(__dirname, "..");
  },
  /**
   * Resolve a path relative to the source root
   * @param {string} path_ - Relative path to resolve
   * @returns {string} Absolute path
   */
  to(path_) {
    return path.resolve(this.path, path_);
  },
};

/**
 * Output path utilities
 * Provides methods for resolving output paths
 */
export const output = {
  /**
   * Get the output root path
   * @returns {string} Absolute path to output root
   */
  get path() {
    return path.resolve(__dirname, "../dist");
  },
  /**
   * Resolve a path relative to the output root
   * @param {string} path_ - Relative path to resolve
   * @returns {string} Absolute path
   */
  to(path_) {
    return path.resolve(this.path, path_);
  },
};

/**
 * Generate cartesian product of arrays
 * @param {...Array} args - Arrays to combine
 * @returns {Generator} Generator that yields combinations
 */
function* cartesianProductOf(...args) {
  if (args.length < 1) {
    yield [];
    return;
  }

  const headSubList = args[0];
  for (const item of headSubList) {
    const tailLists = args.slice(1);
    for (const items of cartesianProductOf(...tailLists)) {
      yield [item].concat(items);
    }
  }
}

/**
 * Generate all build option combinations
 * @returns {Generator} Generator that yields build option combinations
 */
export function* allBuildOptions() {
  yield* cartesianProductOf(buildOptions.supportImage);
}

/**
 * Generate image build option combinations
 * @returns {Generator} Generator that yields image build option combinations
 */
export function* imageBuildOptions() {
  yield* cartesianProductOf(buildOptions.supportImage);
}

/**
 * Get feature name based on supportImage flag
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {string} Feature name ("full" or "lite")
 */
export function getFeatureName(supportImage) {
  return supportImage ? "full" : "lite";
}

/**
 * Create a named Gulp task
 * @param {string} name - Task name
 * @param {Function} task - Task function
 * @param {...any} args - Arguments to pass to task function
 * @returns {Function} Named task function
 */
export function createNamedTask(name, task, ...args) {
  const fn = _.partial(task, ...args);
  fn.displayName = name;
  return fn;
}

/**
 * Transform stream that removes empty lines
 * @extends stream.Transform
 */
class RemoveEmptyLines extends stream.Transform {
  /**
   * Transform implementation
   * @param {Object} chunk - Data chunk
   * @param {string} encoding - Encoding
   * @param {Function} callback - Callback function
   */
  _transform(chunk, encoding, callback) {
    let rv = chunk.contents.toString(encoding);
    rv = rv.replace(/^\s*[\r\n]/gm, "");
    chunk.contents = Buffer.from(rv, encoding);
    callback(null, chunk);
  }
}

/**
 * Create a remove empty lines transform stream
 * @returns {RemoveEmptyLines} Transform stream
 */
export function removeEmptyLines() {
  return new RemoveEmptyLines({
    objectMode: true,
  });
}
