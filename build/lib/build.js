import _ from "lodash";

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
