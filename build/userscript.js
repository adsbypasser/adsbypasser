import fs from "fs/promises";

import _ from "lodash";
import findup from "findup-sync";
import gulp from "gulp";

import { extractDomainsFromJSDoc } from "./jsdoc.js";
import { deduplicateRootDomains } from "./domain.js";
import {
  createNamedTask,
  getFeatureName,
  imageBuildOptions,
  output,
  plugins,
  removeEmptyLines,
  source,
} from "./lib.js";

// generate userscripts for all configurations
export function createUserscriptTasks() {
  const tasks = [];

  for (const [supportImage] of imageBuildOptions()) {
    const featureName = getFeatureName(supportImage);

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

    const bodyTask = createNamedTask(
      `userscript:body:${featureName}`,
      makeBody,
      supportImage,
    );
    const body = gulp.series(namespaceAndHandlers, bodyTask);

    const metaTask = createNamedTask(
      `userscript:meta:${featureName}`,
      makeMeta,
      supportImage,
    );
    const metaAndBody = gulp.parallel(metaTask, body);

    const linkTask = createNamedTask(
      `userscript:${featureName}`,
      linkFiles,
      supportImage,
    );

    const task = gulp.series(metaAndBody, linkTask);
    tasks.push(task);
  }

  return gulp.parallel(...tasks);
}

// combine meta and body to userscript
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

// generate meta.js
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
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(output.path));
}

// generate body script
function makeBody(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespacePath = output.to(`namespace/${featureName}.js`);
  const handlersPath = output.to(`handlers/${featureName}.js`);

  return gulp
    .src(source.to("src/util/main.js"))
    .pipe(
      plugins.webpack({
        resolve: {
          alias: {
            __ADSBYPASSER_NAMESPACE__: namespacePath,
            __ADSBYPASSER_HANDLERS__: handlersPath,
          },
          modules: [source.to("src"), "node_modules"],
          extensions: [".js", ".json"],
          fullySpecified: false,
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
      }),
    )
    .pipe(plugins.stripComments())
    .pipe(removeEmptyLines())
    .pipe(plugins.rename(`${featureName}.js`))
    .pipe(gulp.dest(output.to("body")));
}

// combine handlers
function makeHandlers(supportImage) {
  const featureName = getFeatureName(supportImage);
  const namespaceScript = "import { _, $ } from '__ADSBYPASSER_NAMESPACE__';\n";

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

// generate namespace
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

async function parsePackageJSON() {
  const p = findup("package.json");
  const pkg = await fs.readFile(p, {
    encoding: "utf-8",
  });
  return JSON.parse(pkg);
}

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
    supportImage,
    buildName: featureName,
  });

  // Add @match directives before the closing // ==/UserScript==
  const matchSection =
    matchDirectives.length > 0 ? matchDirectives.join("\n") + "\n" : "";

  s = ["// ==UserScript==\n", s, matchSection, "// ==/UserScript==\n"];
  return s.join("");
}

function finalizeNamespace(supportImage, content) {
  let s = _.template(content);
  s = s({
    supportImage,
  });
  return s;
}
