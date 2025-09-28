import { rimraf } from "rimraf";

import { output } from "../lib/paths.js";

/**
 * Clean the output directory
 * @returns {Promise<void>} Promise that resolves when cleaning is complete
 */
export function clean() {
  return rimraf(output.path);
}
