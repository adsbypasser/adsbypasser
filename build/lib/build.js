import fs from "fs/promises";
import path from "path";

/**
 * Build configuration options
 * @type {Object}
 */
const buildOptions = {
  supportImage: [true, false],
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
 * List files with the given extension in a directory, sorted by name
 * @param {string} directory - Directory path
 * @param {string} extension - File extension, including the dot
 * @returns {Promise<string[]>} Absolute file paths
 */
export async function listFiles(directory, extension) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => path.join(directory, entry.name))
    .sort();
}

/**
 * Read text files in order
 * @param {string[]} files - File paths
 * @returns {Promise<string[]>} File contents
 */
export function readFiles(files) {
  return Promise.all(files.map((file) => fs.readFile(file, "utf-8")));
}

/**
 * Write a text file, creating parent directories as needed
 * @param {string} file - File path
 * @param {string} content - File content
 * @returns {Promise<void>}
 */
export async function writeFile(file, content) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
}
