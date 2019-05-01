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

    for (const [supportLagacy] of ecmaBuildOptions()) {
      const ecmaName = getEcmaName(supportLagacy);

      const bodyTask = createNamedTask(
        `userscript:body:${featureName}:${ecmaName}`,
        makeBody,
        supportImage, supportLagacy,
      );
      const body = gulp.series(namespaceAndHandlers, bodyTask);

      const metaTask = createNamedTask(
        `userscript:meta:${featureName}:${ecmaName}`,
        makeMeta,
        supportImage, supportLagacy,
      );
      const metaAndBody = gulp.parallel(metaTask, body);

      const linkTask = createNamedTask(
        `userscript:${featureName}:${ecmaName}`,
        linkFiles,
        supportImage, supportLagacy,
      );

      const task = gulp.series(metaAndBody, linkTask);
      tasks.push(task);
    }
  }

  return gulp.parallel(...tasks);
}


// combine meta and body to userscript
function linkFiles (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';

  return gulp.src([
    output.to(`adsbypasser.${featureName}.${ecmaName}.meta.js`),
    output.to(`body/${featureName}.${ecmaName}.js`),
  ])
    .pipe(plugins.concat(`adsbypasser.${featureName}.${ecmaName}.user.js`))
    .pipe(gulp.dest(output.path));;
}


// generate meta.js
function makeMeta (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';

  return gulp.src(source.to('infra/userscript/metadata.template.js'))
    .pipe(plugins.change(_.partial(finalizeMetadata, supportImage, supportLagacy)))
    .pipe(plugins.rename(`adsbypasser.${featureName}.${ecmaName}.meta.js`))
    .pipe(plugins.removeEmptyLines())
    .pipe(gulp.dest(output.path));
}


// generate body script
function makeBody (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';
  const namespacePath = output.to(`namespace/${featureName}.js`);
  const handlersPath = output.to(`handlers/${featureName}.js`);
  const compileRules = [];

  if (supportLagacy) {
    compileRules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-runtime'],
          presets: ['@babel/preset-env'],
        },
      },
    });
  }

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
      module: {
        rules: compileRules,
      },
    }))
    .pipe(plugins.stripComments())
    .pipe(plugins.removeEmptyLines())
    .pipe(plugins.rename(`${featureName}.${ecmaName}.js`))
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
