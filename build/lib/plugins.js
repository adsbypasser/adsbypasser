import { rollup } from "rollup";
import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { Transform } from "stream";
import path from "path";
import gulpChange from "gulp-change";
import gulpConcat from "gulp-concat";
import gulpInjectString from "gulp-inject-string";
import gulpLess from "gulp-less";
import gulpRename from "gulp-rename";
import gulpStripComments from "gulp-strip-comments";

/**
 * Gulp plugins wrapper
 * Provides a consistent interface for accessing Gulp plugins
 */
export const plugins = {
  change: gulpChange,
  concat: gulpConcat,
  injectString: gulpInjectString,
  less: gulpLess,
  rename: gulpRename,
  stripComments: gulpStripComments,
  /**
   * Rollup plugin wrapper for Gulp integration
   * @param {Object} config - Rollup configuration
   * @returns {stream.Transform} Rollup stream
   */
  rollup: (config) => {
    return new Transform({
      objectMode: true,
      async transform(file, encoding, callback) {
        try {
          if (file.isNull()) {
            return callback(null, file);
          }

          if (file.isStream()) {
            return callback(new Error("Streaming not supported"));
          }

          // Create rollup configuration
          const rollupConfig = {
            input: file.path,
            plugins: [
              alias({
                entries: [
                  ...(config.alias || []),
                  // Add util alias to resolve util/* imports
                  {
                    find: /^util\/(.+)$/,
                    replacement: path.resolve(process.cwd(), "src/util/$1"),
                  },
                ],
              }),
              nodeResolve({
                modules: config.modules ?? ["node_modules"],
                extensions: config.extensions ?? [".js", ".json"],
                preferBuiltins: false,
              }),
            ],
            external: config.external ?? [],
            onwarn(warning, warn) {
              // Suppress eval warnings for userscript functionality
              if (warning.code === "EVAL") {
                return;
              }
              // Pass through other warnings
              warn(warning);
            },
            output: {
              format: "iife",
              name: "AdsBypasser",
              ...config.output,
            },
          };

          // Run rollup
          const bundle = await rollup(rollupConfig);
          const result = await bundle.generate(rollupConfig.output);

          // Update file contents with rollup output
          if (result.output && result.output[0] && result.output[0].code) {
            file.contents = Buffer.from(result.output[0].code);
            callback(null, file);
          } else {
            callback(new Error("No output generated from rollup"));
          }
        } catch (error) {
          callback(error);
        }
      },
    });
  },
};
