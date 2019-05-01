import gulp from 'gulp';

import {
  output,
  plugins,
  source,
} from './lib.js';


export function createTestTasks () {
  const mochaTask = gulp.series(mochaCore, mocha);
  return gulp.parallel(lint, mochaTask);
}


function lint () {
  return gulp.src([
    source.to('src/**/*.js'),
  ])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
lint.displayName = 'test:lint';


function mocha () {
  return gulp.src(output.to('tests/core.js'))
    .pipe(plugins.mocha({
      reporter: 'spec',
    }));
}
mocha.displayName = 'test:mocha';


function mochaCore () {
  return gulp.src(source.to('tests/core.js'))
    .pipe(plugins.webpack({
      resolve: {
        modules: [
          source.to('src'),
          'node_modules',
        ],
      },
    }))
    .pipe(plugins.rename(`core.js`))
    .pipe(gulp.dest(output.to('tests')));
}
mochaCore.displayName = 'test:mocha:core';
