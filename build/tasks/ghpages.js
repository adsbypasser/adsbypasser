import fs from "fs/promises";
import path from "path";

import { generateSitesData, generateUrlsData } from "../lib/jekyll.js";
import { allBuildOptions, getFeatureName } from "../lib/build.js";
import { output, source } from "../lib/paths.js";
import { userscript } from "./userscript.js";

/**
 * Generate GitHub Pages site
 * @returns {Promise<void>}
 */
export async function ghpages() {
  await userscript(); // Build userscripts first
  await copyJekyllSource(); // Copy Jekyll source to dist/ghpages/
  await generateData(); // Generate Jekyll data files (to dist/ghpages/_data/)
  await copyReleases(); // Copy releases to dist/ghpages/releases/
}

/**
 * Generate Jekyll data files (_data/sites.json and _data/urls.json)
 * @returns {Promise<void>}
 */
async function generateData() {
  await generateSitesData();
  await generateUrlsData();
}

/**
 * Copy Jekyll source files to dist/ghpages/
 * @returns {Promise<void>}
 */
function copyJekyllSource() {
  return fs.cp(source.to("templates/jekyll"), output.to("ghpages"), {
    recursive: true,
  });
}

/**
 * Copy release files to ghpages/releases directory
 * @returns {Promise<void>}
 */
async function copyReleases() {
  const outPath = output.to("ghpages/releases");
  await fs.mkdir(outPath, { recursive: true });

  // Add all feature combinations
  const files = [];
  for (const [supportImage] of allBuildOptions()) {
    const featureName = getFeatureName(supportImage);
    files.push(`adsbypasser.${featureName}.user.js`);
    files.push(`adsbypasser.${featureName}.meta.js`);
  }

  await Promise.all(
    files.map((file) => fs.copyFile(output.to(file), path.join(outPath, file))),
  );
}
