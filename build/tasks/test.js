import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Create test tasks
 * @returns {Function} Gulp series task function
 */
export function createTestTasks() {
  return vitest;
}

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
vitest.displayName = "test";
