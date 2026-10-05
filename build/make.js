/**
 * Build task runner for AdsBypasser
 *
 * Usage: node build/make.js <task>
 */

import { performance } from "perf_hooks";

import { clean } from "./tasks/clean.js";
import { ghpages } from "./tasks/ghpages.js";
import { userscript } from "./tasks/userscript.js";

const tasks = {
  // Cleanup task
  clean,

  // GitHub Pages deployment tasks
  ghpages,

  // Main build tasks
  userscript,
};

const name = process.argv[2];
const task = Object.hasOwn(tasks, name ?? "") ? tasks[name] : null;
if (!task) {
  console.error(name ? `Unknown task: ${name}` : "No task given");
  console.error(`Available tasks: ${Object.keys(tasks).join(", ")}`);
  process.exit(1);
}

const start = performance.now();
console.log(`Starting '${name}'...`);
try {
  await task();
} catch (error) {
  console.error(error);
  process.exit(1);
}
const elapsed = ((performance.now() - start) / 1000).toFixed(2);
console.log(`Finished '${name}' after ${elapsed} s`);
