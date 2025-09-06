import _ from 'lodash';
import gulp from 'gulp';

import {
  createNamedTask,
  ecmaBuildOptions,
  finalizeMetadata,
  finalizeNamespace,
  getEcmaName,
  getFeatureName,
  imageBuildOptions,
  output,
  plugins,
  removeEmptyLines,
  source,
} from './lib.js';


// generate userscripts for all configurations
export function createUserscriptTasks () {
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
function linkFiles (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';

  return gulp.src([
    output.to(`adsbypasser.${featureName}.meta.js`),
    output.to(`body/${featureName}.js`),
  ])
    .pipe(plugins.concat(`adsbypasser.${featureName}.user.js`))
    .pipe(gulp.dest(output.path));;
}


// generate meta.js
function makeMeta (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';

  return gulp.src(source.to('infra/userscript/metadata.template.js'))
    .pipe(plugins.change(_.partial(finalizeMetadata, supportImage)))
    .pipe(plugins.rename(`adsbypasser.${featureName}.meta.js`))
    .pipe(removeEmptyLines())
    .pipe(gulp.dest(output.path));
}


// generate body script
function makeBody (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';
  const namespacePath = output.to(`namespace/${featureName}.js`);
  const handlersPath = output.to(`handlers/${featureName}.js`);

  return gulp.src(source.to('src/util/main.js'))
    .pipe(plugins.webpack({
      resolve: {
        alias: {
          '__ADSBYPASSER_NAMESPACE__': namespacePath,
          '__ADSBYPASSER_HANDLERS__': handlersPath,
        },
        modules: [
          source.to('src'),
          'node_modules',
        ],
      },
    }))
    .pipe(plugins.stripComments())
    .pipe(removeEmptyLines())
    .pipe(plugins.rename(`${featureName}.js`))
    .pipe(gulp.dest(output.to('body')));
}


// combine handlers
function makeHandlers (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';
  const namespaceScript = 'import { _, $ } from \'__ADSBYPASSER_NAMESPACE__\';\n';

  const handlers = [
    'src/sites/file/*.js',
    'src/sites/link/*.js',
    'src/sites/paste/*.js',
  ];
  if (supportImage) {
    handlers.push('src/sites/image/*.js');
  }
  return gulp.src(handlers.map(source.to.bind(source)))
    .pipe(plugins.concat(`${featureName}.js`))
    .pipe(plugins.injectString.prepend(namespaceScript))
    .pipe(gulp.dest(output.to('handlers')));
}


// generate namespace
function makeNamespace (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';

  return gulp.src(source.to('infra/userscript/namespace.template.js'))
    .pipe(plugins.change(_.partial(finalizeNamespace, supportImage)))
    .pipe(plugins.rename(`${featureName}.js`))
    .pipe(gulp.dest(output.to('namespace')));
}
