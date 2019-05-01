import gulp from 'gulp';

import {
  output,
  plugins,
} from './lib.js';


export function clean () {
  return gulp.src(output.path)
    .pipe(plugins.clean());
}
