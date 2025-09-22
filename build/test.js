import gulp from "gulp";
import { exec } from "child_process";
import { promisify } from "util";

import { plugins, source } from "./lib.js";

const execAsync = promisify(exec);

/**
 * Create test tasks
 * @returns {Function} Gulp parallel task function
 */
export function createTestTasks() {
  return gulp.parallel(lint, vitest);
}

/**
 * Lint source files with ESLint
 * @returns {stream.Readable} Gulp stream
 */
function lint() {
  return gulp
    .src([source.to("src/**/*.js")])
    .pipe(plugins.eslint.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
lint.displayName = "test:lint";

/**
 * Run tests with Vitest
 * @returns {Promise<void>} Promise that resolves when tests complete
 */
function vitest() {
  return new Promise((resolve, reject) => {
    execAsync("npx vitest run")
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
vitest.displayName = "test:vitest";
