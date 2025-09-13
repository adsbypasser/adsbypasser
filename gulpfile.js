import { createUserscriptTasks } from "./build/userscript.js";
import { createTestTasks } from "./build/test.js";
import { createGhpagesTasks } from "./build/ghpages.js";
import { createCheckTasks } from "./build/check.js";
import { clean } from "./build/clean.js";

const userscript = createUserscriptTasks();
const test = createTestTasks();
const ghpages = createGhpagesTasks(userscript);
const check = createCheckTasks();

// Export tasks for Gulp 5
export { check, clean, ghpages, test, userscript as default, userscript };
