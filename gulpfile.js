'use strict';


var path = require('path');
var child_process = require('child_process');
var fs = require('fs');

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
var wintersmith = require('wintersmith');

// a bit hacky?
var pkg = require('./package.json');


gulp.task('default', ['clean', 'meta', 'script', 'merge']);

gulp.task('clean', () => {
  return gulp.src([
    'dest/script',
    'dest/adsbypasser.meta.js',
    'dest/adsbypasser.user.js',
    'dest/adsbypasserlite.meta.js',
    'dest/adsbypasserlite.user.js',
    'dest/coverage.html',
    'dest/summary.md',
  ])
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
    'src/util/main.js',
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
  return gulp.src([
    'src/util/image.js',
    'src/sites/image/*.js',
  ])
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
    'src/util/main.js',
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
    // .pipe(plugins.blanketMocha({
    //   instrument: ['tests/coverage.js'],
    //   captureFile: 'dest/coverage.html',
    //   quiet: true,
    //   reporter: 'html-cov',
    // }));
});

gulp.task('deploy', ['sanity', 'default', 'summary', 'clone', 'copy:summary', 'copy:compiled', 'wintersmith', 'clean:wintersmith']);

gulp.task('sanity', (done) => {
  // do not include experimental code
  var p = child_process.spawn('git', ['status', '--porcelain']);
  p.stdout.on('data', (data) => {
    var uncleanFiles = data.toString('utf8').trim().split('\n', false).length;
    if (uncleanFiles > 0) {
      done(false);
    }
    done();
  });
  p.on('error', (error) => {
    throw error;
  });
});

gulp.task('summary', (done) => {
  var p = child_process.spawn('python2', ['-m', 'mirrors.summary'], {
    cwd: 'deploy',
  });
  p.on('close', () => {
    done();
  });
  p.on('error', (error) => {
    throw error;
  });
});

gulp.task('clone', (done) => {
  var data = require('./.deploy.json');
  var stats = fs.statSync('dest/adsbypasser');
  if (stats.isDirectory()) {
    done();
    return;
  }

  var p = child_process.spawn('git', ['clone', data.ghpages.REPO, '-b', 'master', 'dest/adsbypasser']);
  p.on('close', () => {
    done();
  });
  p.on('error', (error) => {
    throw error;
  });
});

gulp.task('copy:summary', () => {
  return gulp.src('dest/summary.md')
    .pipe(gulp.dest('deploy/ghpages/contents'));
});

gulp.task('copy:compiled', ['default'], () => {
  return gulp.src([
    'dest/adsbypasser.user.js',
    'dest/adsbypasser.meta.js',
    'dest/adsbypasserlite.user.js',
    'dest/adsbypasserlite.meta.js',
  ])
    .pipe(gulp.dest('deploy/ghpages/contents/releases'));
});

gulp.task('wintersmith', ['copy:summary', 'copy:compiled'], (done) => {
  var options = {
    config: 'deploy/ghpages/config.json',
    summary: 'dest/deploy/summary.md',
    userjs: 'dest/adsbypasser.user.js',
    metajs: 'dest/adsbypasser.meta.js',
    lite_userjs: 'dest/adsbypasserlite.user.js',
    lite_metajs: 'dest/adsbypasserlite.meta.js',
  };
  var rootPath = 'deploy/ghpages/contents';
  var releasePath = path.join(rootPath, 'releases');
  var outPath = 'dest/adsbypasser';

  var env = wintersmith(options.config);
  env.build(outPath, (error) => {
    if (error) {
      throw error;
    }
    done();
  });
});

gulp.task('clean:wintersmith', ['wintersmith'], () => {
  return gulp.src([
    'deploy/ghpages/contents/summary.md',
    'deploy/ghpages/contents/releases',
  ])
    .pipe(plugins.vinylPaths(plugins.del));
});

gulp.task('mirror', ['sanity', 'default', 'summary'], (done) => {
  var p = child_process.spawn('python2', ['-m', 'mirrors'], {
    cwd: 'deploy',
  });
  p.on('close', () => {
    done();
  });
  p.on('error', (error) => {
    throw error;
  });
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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
