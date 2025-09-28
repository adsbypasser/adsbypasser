import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulpChange from "gulp-change";
import gulpConcat from "gulp-concat";
import gulpInjectString from "gulp-inject-string";
import gulpLess from "gulp-less";
import gulpRename from "gulp-rename";
import gulpStripComments from "gulp-strip-comments";
import { createEslintPlugin } from "./eslint.js";

/**
 * ESLint plugin instance
 * @type {Object}
 */
const eslintPlugin = createEslintPlugin();

/**
 * Gulp plugins wrapper
 * Provides a consistent interface for accessing Gulp plugins
 */
export const plugins = {
  change: gulpChange,
  concat: gulpConcat,
  eslint: eslintPlugin,
  injectString: gulpInjectString,
  less: gulpLess,
  rename: gulpRename,
  stripComments: gulpStripComments,
  /**
   * Webpack plugin wrapper
   * @param {Object} arg - Webpack configuration
   * @returns {stream.Transform} Webpack stream
   */
  webpack: (arg) => {
    arg.mode = "none";
    return webpackStream(arg, webpack);
  },
};
