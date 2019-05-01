import childProcess from 'child_process';
import fs from 'fs';
import util from 'util';

import _ from 'lodash';
import gulp from 'gulp';

import {
  getSummaryForGitHubPages,
} from '../infra/website/summary.js';
import {
  allBuildOptions,
  finalizeHTML,
  getEcmaName,
  getFeatureName,
  output,
  plugins,
  source,
} from './lib.js';


const ghpagesRepoURL = 'git@github.com:adsbypasser/adsbypasser.github.io.git';


export function createGhpagesTasks (userscriptTask) {
  const copyReleasesTask = gulp.series(userscriptTask, copyReleases);
  const ghpagesTasks = gulp.parallel(
    makeHtml,
    makeLess,
    copyFiles,
    copyReleasesTask,
  );
  return gulp.series(clone, ghpagesTasks);
}


function makeHtml () {
  const options = {
    summary: getSummaryForGitHubPages(),
    urls: {},
  };
  for (const [supportImage, supportLagacy] of allBuildOptions()) {
    const featureName = getFeatureName(supportImage);
    const ecmaName = getEcmaName(supportLagacy);
    const js = `adsbypasser.${featureName}.${ecmaName}.user.js`;
    options.urls[`${featureName}_${ecmaName}`] = js;
  }
  const outPath = output.to('ghpages');

  return gulp.src([
    source.to('infra/ghpages/index.template.html'),
  ])
    .pipe(plugins.change(_.partial(finalizeHTML, options)))
    .pipe(plugins.rename((path_) => {
      path_.basename = path_.basename.replace('.template', '');
    }))
    .pipe(gulp.dest(outPath));
}
makeHtml.displayName = 'ghpages:html';


function makeLess () {
  return gulp.src([
    source.to('infra/ghpages/**/*.less'),
  ])
    .pipe(plugins.less({}))
    .pipe(gulp.dest(output.to('ghpages')));
}
makeLess.displayName = 'ghpages:less';


function copyFiles () {
  const files = [
    'infra/ghpages/**/*.css',
    'infra/ghpages/**/*.js',
    'infra/ghpages/configure.html',
  ];
  return gulp.src(files.map(source.to.bind(source)))
    .pipe(gulp.dest(output.to('ghpages')));
}
copyFiles.displayName = 'ghpages:copy:files';


function copyReleases () {
  const files = [];
  for (const [supportImage, supportLagacy] of allBuildOptions()) {
    const featureName = supportImage ? 'full' : 'lite';
    const ecmaName = supportLagacy ? 'es5' : 'es7';
    let js = output.to(`adsbypasser.${featureName}.${ecmaName}.user.js`);
    files.push(js);
    js = output.to(`adsbypasser.${featureName}.${ecmaName}.meta.js`);
    files.push(js);
  }
  return gulp.src(files)
    .pipe(gulp.dest(output.to('ghpages/releases')));
}
copyReleases.displayName = 'ghpages:copy:releases';


async function clone () {
  const repoPath = output.to('ghpages');

  const stat = util.promisify(fs.stat);
  try {
    const stats = await stat(repoPath);
    if (stats.isDirectory()) {
      return;
    }
  } catch (e) {
    // not exists
  }

  const cloneTask = new Promise((resolve, reject) => {
    const p = childProcess.spawn('git', [
      'clone',
      ghpagesRepoURL,
      '-b',
      'master',
      repoPath,
    ]);
    p.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error('process error'));
      }
      resolve();
    });
  });

  return await cloneTask;
}
clone.displayName = 'ghpages:clone';
