import gulp from "gulp";

import { generateSitesData, generateUrlsData } from "../lib/jekyll.js";
import { allBuildOptions, getFeatureName } from "../lib/build.js";
import { output, source } from "../lib/paths.js";

/**
 * Create GitHub Pages generation tasks
 * @param {Function} userscriptTask - Userscript generation task
 * @returns {Function} Gulp series task function
 */
export function createGhpagesTasks(userscriptTask) {
  const ghpagesTasks = gulp.series(
    userscriptTask, // Build userscripts first
    copyJekyllSource, // Copy Jekyll source to dist/ghpages/
    generateData, // Generate Jekyll data files (to dist/ghpages/_data/)
    copyReleases, // Copy releases to dist/ghpages/releases/
  );
  return ghpagesTasks;
}

/**
 * Generate Jekyll data files (_data/sites.json and _data/urls.json)
 * @returns {Promise<void>}
 */
async function generateData() {
  await generateSitesData();
  await generateUrlsData();
}
generateData.displayName = "ghpages:generate:data";

/**
 * Copy Jekyll source files to dist/ghpages/
 * @returns {stream.Readable} Gulp stream
 */
function copyJekyllSource() {
  const jekyllPath = source.to("templates/jekyll");
  const outPath = output.to("ghpages");

  return gulp.src([`${jekyllPath}/**/*`]).pipe(gulp.dest(outPath));
}
copyJekyllSource.displayName = "ghpages:copy:jekyll";

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
