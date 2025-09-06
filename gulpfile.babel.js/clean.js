import { rimraf } from 'rimraf';

import {
  output,
} from './lib.js';


export function clean () {
  return rimraf(output.path);
}
