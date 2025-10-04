import fs from "fs/promises";

import { output } from "../lib/paths.js";

/**
 * Clean the output directory
 * @returns {Promise<void>} Promise that resolves when cleaning is complete
 */
export function clean() {
  return fs.rm(output.path, { recursive: true, force: true });
}
