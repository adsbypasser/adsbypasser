require('@babel/register');

const { createUserscriptTasks } = require('./gulpfile.babel.js/userscript.js');
const { createTestTasks } = require('./gulpfile.babel.js/test.js');
const { createGhpagesTasks } = require('./gulpfile.babel.js/ghpages.js');
const { createCheckTasks } = require('./gulpfile.babel.js/check.js');
const { clean } = require('./gulpfile.babel.js/clean.js');

const userscript = createUserscriptTasks();
const test = createTestTasks();
const ghpages = createGhpagesTasks(userscript);
const check = createCheckTasks();

// Export tasks for Gulp 5
module.exports = {
  check,
  clean,
  ghpages,
  test,
  default: userscript,
  userscript,
};
