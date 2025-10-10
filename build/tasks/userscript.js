import fs from "fs/promises";

import _ from "lodash";
import findup from "findup-sync";
import gulp from "gulp";

import { extractDomainsFromJSDoc } from "../jsdoc.js";
import { deduplicateRootDomains } from "../lib/domain.js";
import {
  createNamedTask,
  getFeatureName,
  imageBuildOptions,
} from "../lib/build.js";
import { output, source } from "../lib/paths.js";
import { plugins } from "../lib/plugins.js";

/**
 * Create userscript generation tasks for all configurations
 * @returns {Function} Gulp parallel task function
 */
export function createUserscriptTasks() {
  const tasks = [];

  for (const [supportImage] of imageBuildOptions()) {
    const featureName = getFeatureName(supportImage);

    // Create namespace and handlers tasks
    const namespaceTask = createNamedTask(
      `userscript:body:namespace:${featureName}`,
      makeNamespace,
      supportImage,
    );
    const handlersTask = createNamedTask(
      `userscript:body:handlers:${featureName}`,
      makeHandlers,
      supportImage,
    );
    const namespaceAndHandlers = gulp.parallel(namespaceTask, handlersTask);

    // Create body task
    const bodyTask = createNamedTask(
      `userscript:body:${featureName}`,
      makeBody,
      supportImage,
    );
    const body = gulp.series(namespaceAndHandlers, bodyTask);

    // Create meta task
    const metaTask = createNamedTask(
      `userscript:meta:${featureName}`,
      makeMeta,
      supportImage,
    );
    const metaAndBody = gulp.parallel(metaTask, body);

    // Create link task
    const linkTask = createNamedTask(
      `userscript:${featureName}`,
      linkFiles,
      supportImage,
    );

    // Combine all tasks for this configuration
    const task = gulp.series(metaAndBody, linkTask);
    tasks.push(task);
  }

  return gulp.parallel(...tasks);
}

/**
 * Combine meta and body files into final userscript
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {stream.Readable} Gulp stream
 */
function linkFiles(supportImage) {
  const featureName = getFeatureName(supportImage);

  return gulp
    .src([
      output.to(`adsbypasser.${featureName}.meta.js`),
      output.to(`body/${featureName}.js`),
    ])
    .pipe(plugins.concat(`adsbypasser.${featureName}.user.js`))
    .pipe(gulp.dest(output.path));
}

/**
 * Generate meta.js file from template
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {stream.Readable} Gulp stream
 */
function makeMeta(supportImage) {
  const featureName = getFeatureName(supportImage);

  return gulp
    .src(source.to("templates/userscript/metadata.template.js"))
    .pipe(
      plugins.change((content, done) => {
        finalizeMetadata(supportImage, content)
          .then((result) => done(null, result))
          .catch((error) => done(error));
      }),
    )
    .pipe(plugins.rename(`adsbypasser.${featureName}.meta.js`))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest(output.path));
}

/**
 * Generate body script using rollup
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {stream.Readable} Gulp stream
 */
function makeBody(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespacePath = output.to(`namespace/${featureName}.js`);
  const handlersPath = output.to(`handlers/${featureName}.js`);

  return gulp
    .src(source.to("src/main.js"))
    .pipe(
      plugins.rollup({
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
      }),
    )
    .pipe(plugins.stripComments())
    .pipe(plugins.removeEmptyLines())
    .pipe(plugins.rename(`${featureName}.js`))
    .pipe(gulp.dest(output.to("body")));
}

/**
 * Combine handlers from site files
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {stream.Readable} Gulp stream
 */
function makeHandlers(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespaceScript = "import { _, $ } from '__ADSBYPASSER_NAMESPACE__';\n";

  // Define which handlers to include based on image support
  const handlers = ["src/sites/file/*.js", "src/sites/link/*.js"];
  if (supportImage) {
    handlers.push("src/sites/image/*.js");
  }

  return gulp
    .src(handlers.map(source.to.bind(source)))
    .pipe(plugins.concat(`${featureName}.js`))
    .pipe(plugins.injectString.prepend(namespaceScript))
    .pipe(gulp.dest(output.to("handlers")));
}

/**
 * Generate namespace file from template
 * @param {boolean} supportImage - Whether image support is enabled
 * @returns {stream.Readable} Gulp stream
 */
function makeNamespace(supportImage) {
  const featureName = getFeatureName(supportImage);

  return gulp
    .src(source.to("templates/userscript/namespace.template.js"))
    .pipe(plugins.change(_.partial(finalizeNamespace, supportImage)))
    .pipe(plugins.rename(`${featureName}.js`))
    .pipe(gulp.dest(output.to("namespace")));
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
  const matchDirectives = uniqueDomains
    .flatMap((domain) => [domain, `*.${domain}`])
    .map((domain) => `// @match          *://${domain}/*`);

  return matchDirectives;
}

/**
 * Parse package.json file
 * @returns {Promise<Object>} Parsed package.json object
 */
async function parsePackageJSON() {
  const p = findup("package.json");
  const pkg = await fs.readFile(p, {
    encoding: "utf-8",
  });
  return JSON.parse(pkg);
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
    version: pkg.version,
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
