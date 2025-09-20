import childProcess from "child_process";
import fs from "fs/promises";

import _ from "lodash";
import gulp from "gulp";

import { getSummaryForGitHubPages } from "./summary.js";
import {
  allBuildOptions,
  finalizeHTML,
  getFeatureName,
  output,
  plugins,
  source,
} from "./lib.js";

const ghpagesRepoURL = "git@github.com:adsbypasser/adsbypasser.github.io.git";

export function createGhpagesTasks(userscriptTask) {
  const copyReleasesTask = gulp.series(userscriptTask, copyReleases);
  const ghpagesTasks = gulp.parallel(
    makeHtml,
    makeLess,
    copyFiles,
    copyReleasesTask,
  );
  return gulp.series(clone, ghpagesTasks);
}

async function makeHtml() {
  const options = {
    summary: await getSummaryForGitHubPages(),
    urls: {
      full: "adsbypasser.full.user.js",
      lite: "adsbypasser.lite.user.js",
    },
  };
  for (const [supportImage] of allBuildOptions()) {
    const featureName = getFeatureName(supportImage);
    const js = `adsbypasser.${featureName}.user.js`;
    options.urls[featureName] = js;
  }
  const outPath = output.to("ghpages");

  return gulp
    .src([source.to("templates/ghpages/index.template.html")])
    .pipe(plugins.change(_.partial(finalizeHTML, options)))
    .pipe(
      plugins.rename((path_) => {
        path_.basename = path_.basename.replace(".template", "");
      }),
    )
    .pipe(gulp.dest(outPath));
}
makeHtml.displayName = "ghpages:html";

function makeLess() {
  return gulp
    .src([source.to("templates/ghpages/**/*.less")])
    .pipe(plugins.less({}))
    .pipe(gulp.dest(output.to("ghpages")));
}
makeLess.displayName = "ghpages:less";

function copyFiles() {
  const files = [
    "templates/ghpages/**/*.css",
    "templates/ghpages/**/*.js",
    "templates/ghpages/configure.html",
  ];
  return gulp
    .src(files.map(source.to.bind(source)))
    .pipe(gulp.dest(output.to("ghpages")));
}
copyFiles.displayName = "ghpages:copy:files";

function copyReleases() {
  const files = [];
  for (const [supportImage] of allBuildOptions()) {
    const featureName = getFeatureName(supportImage);
    let js = output.to(`adsbypasser.${featureName}.user.js`);
    files.push(js);
    js = output.to(`adsbypasser.${featureName}.meta.js`);
    files.push(js);
  }
  return gulp.src(files).pipe(gulp.dest(output.to("ghpages/releases")));
}
copyReleases.displayName = "ghpages:copy:releases";

async function clone() {
  const repoPath = output.to("ghpages");

  try {
    const stats = await fs.stat(repoPath);
    if (stats.isDirectory()) {
      return;
    }
  } catch (e) {
    // not exists
  }

  const cloneTask = new Promise((resolve, reject) => {
    const p = childProcess.spawn("git", [
      "clone",
      ghpagesRepoURL,
      "-b",
      "master",
      repoPath,
    ]);
    p.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error("process error"));
      }
      resolve();
    });
  });

  return await cloneTask;
}
clone.displayName = "ghpages:clone";
