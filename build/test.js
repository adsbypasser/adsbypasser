import gulp from 'gulp';
import { exec } from 'child_process';
import { promisify } from 'util';

import {
  plugins,
  source,
} from './lib.js';

const execAsync = promisify(exec);

export function createTestTasks () {
  return gulp.parallel(lint, vitest);
}


function lint () {
  return gulp.src([
    source.to('src/**/*.js'),
  ])
    .pipe(plugins.eslint.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
lint.displayName = 'test:lint';


function vitest () {
  return new Promise((resolve, reject) => {
    execAsync('npx vitest run')
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
vitest.displayName = 'test:vitest';
