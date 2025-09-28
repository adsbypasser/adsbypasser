import stream from "stream";
import { ESLint } from "eslint";

/**
 * Custom ESLint function to replace gulp-eslint
 * Provides linting capabilities for Gulp streams
 */
export function createEslintPlugin() {
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
