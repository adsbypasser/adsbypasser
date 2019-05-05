import { createUserscriptTasks } from './userscript.js';
import { createTestTasks } from './test.js';
import { createGhpagesTasks } from './ghpages.js';
import { createCheckTasks } from './check.js';
import { clean } from './clean.js';


const userscript = createUserscriptTasks();
const test = createTestTasks();
const ghpages = createGhpagesTasks(userscript);
const check = createCheckTasks();


export {
  check,
  clean,
  ghpages,
  test,
  userscript as default,
  userscript,
};
