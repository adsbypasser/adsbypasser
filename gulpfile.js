/**
 * Gulpfile for AdsBypasser
 *
 * This file orchestrates all the build tasks for the project.
 * It imports task creators from the build directory and initializes them.
 */

// Import task creators
import { createUserscriptTasks } from "./build/tasks/userscript.js";
import { createTestTasks } from "./build/tasks/test.js";
import { createGhpagesTasks } from "./build/tasks/ghpages.js";
import { createCheckTasks } from "./build/tasks/check.js";
import { clean } from "./build/tasks/clean.js";

// Initialize all task collections
const userscriptTasks = createUserscriptTasks();
const testTasks = createTestTasks();
const ghpagesTasks = createGhpagesTasks(userscriptTasks);
const checkTasks = createCheckTasks();

// Export tasks with descriptive names for Gulp 5
export {
  // Validation and checking tasks
  checkTasks as check,

  // Cleanup task
  clean,

  // GitHub Pages deployment tasks
  ghpagesTasks as ghpages,

  // Testing tasks
  testTasks as test,

  // Main build tasks (default export)
  userscriptTasks as default,
  userscriptTasks as userscript,
};
