import path from "path";

import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import decomment from "decomment";
import { rollup } from "rollup";

import { source } from "./paths.js";

/**
 * Bundle an entry file with rollup
 * @param {string} input - Entry file path
 * @param {Object} config - Bundle configuration
 * @returns {Promise<string>} Bundled code
 */
export async function bundle(input, config) {
  const rollupConfig = {
    input,
    plugins: [
      alias({
        entries: [
          ...(config.alias || []),
          // Add $lib alias to resolve $lib/* imports
          {
            find: /^\$lib\/(.+)$/,
            replacement: path.resolve(source.path, "src/lib/$1"),
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
  };

  const result = await rollup(rollupConfig);
  try {
    const { output } = await result.generate({
      format: "iife",
      name: "AdsBypasser",
      ...config.output,
    });
    if (!output[0]?.code) {
      throw new Error("No output generated from rollup");
    }
    return output[0].code;
  } finally {
    await result.close();
  }
}

/**
 * Strip comments from JavaScript code
 * @param {string} content - JavaScript code
 * @returns {string} Code without comments
 */
export function stripComments(content) {
  return decomment(content);
}

/**
 * Remove empty lines from content
 * @param {string} content - Text content
 * @returns {string} Content without empty lines
 */
export function removeEmptyLines(content) {
  return content.replace(/^\s*[\r\n]/gm, "");
}
