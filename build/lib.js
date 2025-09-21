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

// Custom ESLint function to replace gulp-eslint
function createEslintPlugin() {
  let eslint;

  return {
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

const buildOptions = {
  supportImage: [true, false],
};

// Create ESLint plugin instance
const eslintPlugin = createEslintPlugin();

// Direct plugin exports for ES modules
export const plugins = {
  change: gulpChange,
  concat: gulpConcat,
  eslint: eslintPlugin,
  injectString: gulpInjectString,
  less: gulpLess,
  rename: gulpRename,
  stripComments: gulpStripComments,
  webpack: (arg) => {
    arg.mode = "none";
    return webpackStream(arg, webpack);
  },
};
export const source = {
  get path() {
    return path.resolve(__dirname, "..");
  },
  to(path_) {
    return path.resolve(this.path, path_);
  },
};
export const output = {
  get path() {
    return path.resolve(__dirname, "../dist");
  },
  to(path_) {
    return path.resolve(this.path, path_);
  },
};

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

export function* allBuildOptions() {
  yield* cartesianProductOf(buildOptions.supportImage);
}

export function* imageBuildOptions() {
  yield* cartesianProductOf(buildOptions.supportImage);
}

export function getFeatureName(supportImage) {
  return supportImage ? "full" : "lite";
}

export function createNamedTask(name, task, ...args) {
  const fn = _.partial(task, ...args);
  fn.displayName = name;
  return fn;
}

class RemoveEmptyLines extends stream.Transform {
  _transform(chunk, encoding, callback) {
    let rv = chunk.contents.toString(encoding);
    rv = rv.replace(/^\s*[\r\n]/gm, "");
    chunk.contents = Buffer.from(rv, encoding);
    callback(null, chunk);
  }
}

export function removeEmptyLines() {
  return new RemoveEmptyLines({
    objectMode: true,
  });
}
