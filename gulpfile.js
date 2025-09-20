// Import task creators
import { createUserscriptTasks } from "./build/userscript.js";
import { createTestTasks } from "./build/test.js";
import { createGhpagesTasks } from "./build/ghpages.js";
import { createCheckTasks } from "./build/check.js";
import { clean } from "./build/clean.js";

// Initialize tasks
const userscriptTasks = createUserscriptTasks();
const testTasks = createTestTasks();
const ghpagesTasks = createGhpagesTasks(userscriptTasks);
const checkTasks = createCheckTasks();

// Export tasks for Gulp 5
export {
  checkTasks as check,
  clean,
  ghpagesTasks as ghpages,
  testTasks as test,
  userscriptTasks as default,
  userscriptTasks as userscript,
};
