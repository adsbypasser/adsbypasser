import _ from "lodash";
import gulp from "gulp";

import { getSummaryForGitHubPages } from "./summary.js";
import {
  allBuildOptions,
  getFeatureName,
  output,
  plugins,
  source,
} from "./lib.js";

/**
 * Create GitHub Pages generation tasks
 * @param {Function} userscriptTask - Userscript generation task
 * @returns {Function} Gulp parallel task function
 */
export function createGhpagesTasks(userscriptTask) {
  const copyReleasesTask = gulp.series(userscriptTask, copyReleases);
  const ghpagesTasks = gulp.parallel(
    makeHtml,
    makeLess,
    copyFiles,
    copyReleasesTask,
  );
  return ghpagesTasks;
}

/**
 * Generate HTML files from templates
 * @returns {stream.Readable} Gulp stream
 */
async function makeHtml() {
  const options = {
    summary: await getSummaryForGitHubPages(),
    urls: {
      full: "adsbypasser.full.user.js",
      lite: "adsbypasser.lite.user.js",
    },
  };

  // Add URLs for all feature combinations
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

/**
 * Compile LESS files to CSS
 * @returns {stream.Readable} Gulp stream
 */
function makeLess() {
  return gulp
    .src([source.to("templates/ghpages/**/*.less")])
    .pipe(plugins.less({}))
    .pipe(gulp.dest(output.to("ghpages")));
}
makeLess.displayName = "ghpages:less";

/**
 * Copy static files to ghpages directory
 * @returns {stream.Readable} Gulp stream
 */
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

/**
 * Copy release files to ghpages/releases directory
 * @returns {stream.Readable} Gulp stream
 */
function copyReleases() {
  const files = [];

  // Add all feature combinations
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

/**
 * Finalize HTML content by injecting options
 * @param {Object} options - Options to inject
 * @param {string} content - Template content
 * @returns {string} Finalized HTML content
 */
function finalizeHTML(options, content) {
  let s = _.template(content);
  s = s(options);
  return s;
}
