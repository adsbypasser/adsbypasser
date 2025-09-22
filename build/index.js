import { createUserscriptTasks } from "./userscript.js";
import { createTestTasks } from "./test.js";
import { createGhpagesTasks } from "./ghpages.js";
import { createCheckTasks } from "./check.js";
import { clean } from "./clean.js";

/**
 * Create all build tasks
 */
const userscript = createUserscriptTasks();
const test = createTestTasks();
const ghpages = createGhpagesTasks(userscript);
const check = createCheckTasks();

/**
 * Export all build tasks
 */
export { check, clean, ghpages, test, userscript as default, userscript };
