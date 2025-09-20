import fs from "fs/promises";
import path from "path";
import stream from "stream";
import { fileURLToPath } from "url";

import _ from "lodash";
import findup from "findup-sync";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import { ESLint } from "eslint";
import gulpChange from "gulp-change";
import gulpConcat from "gulp-concat";
import gulpInjectString from "gulp-inject-string";
import gulpLess from "gulp-less";
import gulpRename from "gulp-rename";
import gulpStripComments from "gulp-strip-comments";
import { extractDomainsFromJSDoc } from "./jsdoc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract domains from JSDoc @domain tags in site files based on supportImage flag
 * @param {boolean} supportImage - Whether to include image sites
 * @returns {Promise<string[]>} Array of @match directive strings
 */
async function extractDomainsForMetadata(supportImage) {
  // Define which directories to scan based on supportImage
  const directories = ["file", "link"];
  if (supportImage) {
    directories.push("image");
  }

  // Use the shared domain extraction function
  const domains = await extractDomainsFromJSDoc(directories);

  // Convert domains to @match format
  const matchDirectives = domains
    .flatMap((domain) => [domain, `*.${domain}`])
    .map((domain) => `// @match          *://${domain}/*`);

  return matchDirectives;
}

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

async function parsePackageJSON() {
  const p = findup("package.json");
  const pkg = await fs.readFile(p, {
    encoding: "utf-8",
  });
  return JSON.parse(pkg);
}

export async function finalizeMetadata(supportImage, content) {
  const featureName = getFeatureName(supportImage);
  const featurePostfix = supportImage ? "" : " Lite";

  // Load package.json
  const pkg = await parsePackageJSON();

  // Extract domains and generate @match directives
  const matchDirectives = await extractDomainsForMetadata(supportImage);

  let s = _.template(content);
  s = s({
    version: pkg.version,
    title: `AdsBypasser${featurePostfix}`,
    supportImage,
    buildName: featureName,
  });

  // Add @match directives before the closing // ==/UserScript==
  const matchSection =
    matchDirectives.length > 0 ? matchDirectives.join("\n") + "\n" : "";

  s = ["// ==UserScript==\n", s, matchSection, "// ==/UserScript==\n"];
  return s.join("");
}

/**
 * Generate domain metadata file content
 * @param {boolean} supportImage - Whether to include image sites
 * @returns {string} Domain metadata content
 */
export function generateDomainMetadata(supportImage) {
  const matchDirectives = extractDomainsForMetadata(supportImage);
  return matchDirectives.join("\n") + "\n";
}

export function finalizeNamespace(supportImage, content) {
  let s = _.template(content);
  s = s({
    supportImage,
  });
  return s;
}

export function finalizeHTML(options, content) {
  let s = _.template(content);
  s = s(options);
  return s;
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
