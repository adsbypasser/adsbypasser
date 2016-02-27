'use strict';


var gulp = require('gulp');
var plugins = {
  del: require('del'),
  vinylPaths: require('vinyl-paths'),
  concat: require('gulp-concat'),
  change: require('gulp-change'),
  rename: require('gulp-rename'),
  stripComments: require('gulp-strip-comments'),
  removeEmptyLines: require('gulp-remove-empty-lines'),
  mocha: require('gulp-mocha'),
  blanketMocha: require('gulp-blanket-mocha'),
};
var _ = require('lodash');

// a bit hacky?
var pkg = require('./package.json');


gulp.task('default', ['clean', 'meta', 'script', 'merge']);

gulp.task('clean', () => {
  return gulp.src(['dest/script'])
    .pipe(plugins.vinylPaths(plugins.del));
});

gulp.task('meta', ['meta:full', 'meta:lite']);

gulp.task('meta:full', ['clean'], () => {
  return gulp.src('src/util/metadata.js')
    .pipe(plugins.change(_.partial(finalizeMetadata, false)))
    .pipe(plugins.rename('adsbypasser.meta.js'))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest('dest'));
});

gulp.task('meta:lite', ['clean'], () => {
  return gulp.src('src/util/metadata.js')
    .pipe(plugins.change(_.partial(finalizeMetadata, true)))
    .pipe(plugins.rename('adsbypasserlite.meta.js'))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest('dest'));
});

gulp.task('script', ['script:full', 'script:lite']);

gulp.task('script:full', [
  'script:util',
  'script:link',
  'script:image',
  'script:file',
  'script:paste',
], () => {
  return gulp.src([
    'dest/script/util.js',
    'dest/script/link.js',
    'dest/script/image.js',
    'dest/script/file.js',
    'dest/script/paste.js',
  ])
    .pipe(plugins.concat('script.js'))
    .pipe(plugins.stripComments())
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:util', ['clean'], () => {
  // NOTE MUST IN ORDER, maybe webpack can help?
  return gulp.src([
    'src/util/core.js',
    'src/util/dom.js',
    'src/util/ajax.js',
    'src/util/cookie.js',
    'src/util/dispatcher.js',
    'src/util/link.js',
    'src/util/misc.js',
    'src/util/config.js',
    'src/util/image.js',
    'src/util/main.js',
  ])
    .pipe(plugins.concat('util.js'))
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:link', ['clean'], () => {
  return gulp.src('src/sites/link/*.js')
    .pipe(plugins.concat('link.js'))
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:image', ['clean'], () => {
  return gulp.src('src/sites/image/*.js')
    .pipe(plugins.concat('image.js'))
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:file', ['clean'], () => {
  return gulp.src('src/sites/file/*.js')
    .pipe(plugins.concat('file.js'))
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:paste', ['clean'], () => {
  return gulp.src('src/sites/paste/*.js')
    .pipe(plugins.concat('paste.js'))
    .pipe(gulp.dest('dest/script'));
});

gulp.task('script:lite', [
  'script:util',
  'script:link',
  'script:file',
  'script:paste',
], () => {
  return gulp.src([
    'dest/script/util.js',
    'dest/script/link.js',
    'dest/script/file.js',
    'dest/script/paste.js',
  ])
    .pipe(plugins.concat('scriptlite.js'))
    .pipe(plugins.stripComments())
    .pipe(gulp.dest('dest/script'));
});

gulp.task('merge', ['merge:full', 'merge:lite']);

gulp.task('merge:full', ['meta:full', 'script:full'], () => {
  return gulp.src([
    'dest/adsbypasser.meta.js',
    'dest/script/script.js',
  ])
    .pipe(plugins.concat('adsbypasser.user.js'))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest('dest'));
});

gulp.task('merge:lite', ['meta:lite', 'script:lite'], () => {
  return gulp.src([
    'dest/adsbypasserlite.meta.js',
    'dest/script/scriptlite.js',
  ])
    .pipe(plugins.concat('adsbypasserlite.user.js'))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest('dest'));
});

gulp.task('test', () => {
  return gulp.src(['tests/*.js'], {read: false})
    .pipe(plugins.mocha({
      reporter: 'spec',
    }))
    .pipe(plugins.blanketMocha({
      instrument: ['tests/coverage.js'],
      captureFile: 'dest/coverage.html',
      quiet: true,
      reporter: 'html-cov',
    }));
});


function finalizeMetadata (isLite, content) {
  var s = _.template(content);
  s = s({
    pkg: pkg,
    lite: isLite,
  });
  s = [
    '// ==UserScript==\n',
    s,
    '// ==/UserScript==\n',
  ];
  return s.join('');
}
