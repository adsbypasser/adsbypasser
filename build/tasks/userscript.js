import fs from "fs/promises";

import _ from "lodash";

import { extractDomainsFromJSDoc } from "../lib/jsdoc.js";
import { deduplicateRootDomains } from "../lib/domain.js";
import {
  getFeatureName,
  imageBuildOptions,
  listFiles,
  readFiles,
  writeFile,
} from "../lib/build.js";
import { output, source } from "../lib/paths.js";
import { bundle, removeEmptyLines, stripComments } from "../lib/transform.js";

/**
 * Generate userscripts for all configurations
 * @returns {Promise<void>}
 */
export async function userscript() {
  await Promise.all(
    Array.from(imageBuildOptions(), ([supportImage]) =>
      buildUserscript(supportImage),
    ),
  );
}

/**
 * Generate the userscript for one configuration
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function buildUserscript(supportImage) {
  const body = async () => {
    await Promise.all([
      makeNamespace(supportImage),
      makeHandlers(supportImage),
    ]);
    await makeBody(supportImage);
  };
  await Promise.all([makeMeta(supportImage), body()]);
  await linkFiles(supportImage);
}

/**
 * Combine meta and body files into final userscript
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function linkFiles(supportImage) {
  const featureName = getFeatureName(supportImage);

  const contents = await readFiles([
    output.to(`adsbypasser.${featureName}.meta.js`),
    output.to(`body/${featureName}.js`),
  ]);
  await writeFile(
    output.to(`adsbypasser.${featureName}.user.js`),
    contents.join("\n"),
  );
}

/**
 * Generate meta.js file from template
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function makeMeta(supportImage) {
  const featureName = getFeatureName(supportImage);

  const template = await fs.readFile(
    source.to("templates/userscript/metadata.template.js"),
    "utf-8",
  );
  const content = await finalizeMetadata(supportImage, template);
  await writeFile(
    output.to(`adsbypasser.${featureName}.meta.js`),
    removeEmptyLines(content),
  );
}

/**
 * Generate body script using rollup
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function makeBody(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespacePath = output.to(`namespace/${featureName}.js`);
  const handlersPath = output.to(`handlers/${featureName}.js`);

  const code = await bundle(source.to("src/main.js"), {
    alias: [
      { find: "__ADSBYPASSER_NAMESPACE__", replacement: namespacePath },
      { find: "__ADSBYPASSER_HANDLERS__", replacement: handlersPath },
    ],
    modules: [source.to("src"), "node_modules"],
    extensions: [".js", ".json"],
    output: {
      format: "iife",
      name: "AdsBypasser",
    },
  });
  await writeFile(
    output.to(`body/${featureName}.js`),
    removeEmptyLines(stripComments(code)),
  );
}

/**
 * Combine handlers from site files
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function makeHandlers(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespaceScript = "import { _, $ } from '__ADSBYPASSER_NAMESPACE__';\n";

  // Define which handlers to include based on image support
  const directories = ["file", "link"];
  if (supportImage) {
    directories.push("image");
  }

  const files = [];
  for (const directory of directories) {
    files.push(
      ...(await listFiles(source.to(`src/sites/${directory}`), ".js")),
    );
  }
  const contents = await readFiles(files);
  await writeFile(
    output.to(`handlers/${featureName}.js`),
    namespaceScript + contents.join("\n"),
  );
}

/**
 * Generate namespace file from template
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {Promise<void>}
 */
async function makeNamespace(supportImage) {
  const featureName = getFeatureName(supportImage);

  const template = await fs.readFile(
    source.to("templates/userscript/namespace.template.js"),
    "utf-8",
  );
  await writeFile(
    output.to(`namespace/${featureName}.js`),
    finalizeNamespace(supportImage, template),
  );
}

/**
 * Extract domains from JSDoc @domain tags in site files based on supportImage flag
 * @param {boolean} supportImage - Whether to include image sites
 * @returns {Promise<string[]>} Array of @match directive strings
 */
async function extractDomainsForMetadata(supportImage) {
  // Define which directories to scan based on supportImage
  const directories = ["file", "link"];
  if (supportImage) {
    directories.push("image");
  }

  // Use the shared domain extraction function
  const domains = await extractDomainsFromJSDoc(directories);

  // Dedupe domains by root domain
  const uniqueDomains = deduplicateRootDomains(domains);

  // Convert domains to @match format
  const matchDirectives = uniqueDomains.map(
    (domain) => `// @match          *://*.${domain}/*`,
  );

  return matchDirectives;
}

/**
 * Parse package.json file
 * @returns {Promise<Object>} Parsed package.json object
 */
async function parsePackageJSON() {
  const pkg = await fs.readFile(source.to("package.json"), {
    encoding: "utf-8",
  });
  return JSON.parse(pkg);
}

/**
 * Get release channel specific metadata values
 *
 * Nightly builds are enabled by setting ADSBYPASSER_NIGHTLY to a version
 * suffix (e.g. 20261004.123456) and ADSBYPASSER_COMMIT to the commit sha.
 * @param {string} version - Package version
 * @returns {Object} Template data for version, description, URLs and icon
 */
function getChannelData(version) {
  const nightly = process.env.ADSBYPASSER_NIGHTLY;
  if (!nightly) {
    return {
      version,
      description: "Bypass Ads",
      releaseBase: "https://adsbypasser.github.io/releases",
      iconRef: `v${version}`,
    };
  }

  const commit = process.env.ADSBYPASSER_COMMIT;
  if (!commit) {
    throw new Error("ADSBYPASSER_COMMIT is required for nightly builds");
  }
  return {
    version: `${version}.${nightly}`,
    description: `Bypass Ads (nightly ${commit.slice(0, 7)})`,
    releaseBase: "https://adsbypasser.github.io/nightly",
    iconRef: commit,
  };
}

/**
 * Finalize metadata content by injecting package data and domains
 * @param {boolean} supportImage - Whether image support is enabled
 * @param {string} content - Template content
 * @returns {Promise<string>} Finalized metadata content
 */
async function finalizeMetadata(supportImage, content) {
  const featureName = getFeatureName(supportImage);
  const featurePostfix = supportImage ? "" : " Lite";

  // Load package.json
  const pkg = await parsePackageJSON();

  // Extract domains and generate @match directives
  const matchDirectives = await extractDomainsForMetadata(supportImage);

  let s = _.template(content);
  s = s({
    ...getChannelData(pkg.version),
    title: `AdsBypasser${featurePostfix}`,
    buildName: featureName,
  });

  // Add @match directives before the closing // ==/UserScript==
  const matchSection =
    matchDirectives.length > 0 ? matchDirectives.join("\n") + "\n" : "";

  s = ["// ==UserScript==\n", s, matchSection, "// ==/UserScript==\n"];
  return s.join("");
}

/**
 * Finalize namespace content
 * @param {boolean} supportImage - Whether image support is enabled
 * @param {string} content - Template content
 * @returns {string} Finalized namespace content
 */
function finalizeNamespace(supportImage, content) {
  let s = _.template(content);
  s = s({
    supportImage,
  });
  return s;
}
