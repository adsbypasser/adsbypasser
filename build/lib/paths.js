import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    return path.resolve(__dirname, "../..");
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
    return path.resolve(__dirname, "../../dist");
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
