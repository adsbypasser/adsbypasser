import gulp from 'gulp';

import {
  output,
  plugins,
} from './lib.js';


export function clean () {
  return gulp.src(output.path, { allowEmpty: true })
    .pipe(plugins.clean());
}
