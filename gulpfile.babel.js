import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

import _ from 'lodash';
import gulp from 'gulp';

import {
  allBuildOptions,
  cartesianProductOf,
  finalizeHTML,
  finalizeMetadata,
  finalizeNamespace,
  imageBuildOptions,
  plugins,
} from './infra/building/lib.js';
import {
  getSummaryForGitHubPages,
} from './infra/website/summary.js';


const ghpagesRepoURL = 'git@github.com:adsbypasser/adsbypasser.github.io.git';
const output = {
  toString () {
    return path.resolve(__dirname, './build');
  },
  to (path_) {
    return path.resolve(this.toString(), path_);
  },
};


gulp.task('default', ['userscript']);
createUserScriptTasks('userscript');

gulp.task('test', ['test:lint', 'test:mocha']);

gulp.task('clean', () => {
  return gulp.src(output.toString())
    .pipe(plugins.clean());
});

gulp.task('test:lint', () => {
  return gulp.src([
    'src/**/*.js',
  ])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('test:mocha', ['test:mocha:core'], () => {
  return gulp.src(output.to('tests/core.js'))
    .pipe(plugins.mocha({
      reporter: 'spec',
    }));
});

gulp.task('test:mocha:core', () => {
  return gulp.src('tests/core.js')
    .pipe(plugins.webpack({
      resolve: {
        modules: [
          path.resolve(__dirname, 'src'),
          'node_modules',
        ],
      },
    }))
    .pipe(plugins.rename(`core.js`))
    .pipe(gulp.dest(output.to('tests')));
});

gulp.task('ghpages', [
  'ghpages:html',
  'ghpages:less',
  'ghpages:copy:files',
  'ghpages:copy:releases',
  'ghpages:copy:legacy',
]);

gulp.task('check', ['check:git']);

// to ensure there is no experimental code
gulp.task('check:git', () => {
  return new Promise((resolve, reject) => {
    const git = child_process.spawn('git', ['status', '--porcelain']);
    git.stdout.on('data', (data) => {
      let uncleanFiles = data.toString('utf8');
      uncleanFiles = uncleanFiles.trim();
      uncleanFiles = uncleanFiles.split('\n');
      if (uncleanFiles.length > 0) {
        reject(new Error('work tree is dirty'));
        return;
      }
      resolve();
    });
    git.on('error', (error) => {
      reject(error);
    });
  });
});

gulp.task('ghpages:html', ['ghpages:clone'], () => {
  const options = {
    summary: getSummaryForGitHubPages(),
    urls: {},
  };
  for (const [supportImage, supportLagacy] of allBuildOptions()) {
    const featureName = supportImage ? 'full' : 'lite';
    const ecmaName = supportLagacy ? 'es5' : 'es7';
    const js = `adsbypasser.${featureName}.${ecmaName}.user.js`;
    options.urls[`${featureName}_${ecmaName}`] = js;
  }
  const outPath = output.to('ghpages');

  return gulp.src([
    'infra/ghpages/index.template.html',
  ])
    .pipe(plugins.change(_.partial(finalizeHTML, options)))
    .pipe(plugins.rename((path_) => {
      path_.basename = path_.basename.replace('.template', '');
    }))
    .pipe(gulp.dest(outPath));
});

gulp.task('ghpages:less', ['ghpages:clone'], () => {
  return gulp.src([
    'infra/ghpages/**/*.less',
  ])
    .pipe(plugins.less({}))
    .pipe(gulp.dest(output.to('ghpages')));
});

gulp.task('ghpages:clone', async () => {
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
    const p = child_process.spawn('git', [
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
});

gulp.task('ghpages:copy:files', ['ghpages:clone'], () => {
  return gulp.src([
    'infra/ghpages/**/*.css',
    'infra/ghpages/**/*.js',
    'infra/ghpages/configure.html',
  ])
    .pipe(gulp.dest(output.to('ghpages')));
});

gulp.task('ghpages:copy:releases', ['ghpages:clone', 'userscript'], () => {
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
});

createCopyLegacyTasks('ghpages:copy:legacy');


// Generate tasks by various configurations.
function createUserScriptTasks (taskName) {
  const subTasks = [];
  for (const [supportImage, supportLagacy] of allBuildOptions()) {
    const subTaskName = createSubUserScriptTask(supportImage, supportLagacy);
    subTasks.push(subTaskName);
  }
  gulp.task(taskName, subTasks);
  for (const [supportImage, supportLagacy] of allBuildOptions()) {
    createMetadataTask(supportImage, supportLagacy);
    createBodyTask(supportImage, supportLagacy);
  }
  for (const [supportImage] of imageBuildOptions()) {
    createNamespaceTask(supportImage);
    createHandlersTask(supportImage);
  }
}


function createSubUserScriptTask (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';
  const taskName = `userscript:${featureName}:${ecmaName}`;

  gulp.task(taskName, [
    `userscript:metadata:${featureName}:${ecmaName}`,
    `userscript:body:${featureName}:${ecmaName}`,
  ], () => {
    return gulp.src([
      output.to(`adsbypasser.${featureName}.${ecmaName}.meta.js`),
      output.to(`body/${featureName}.${ecmaName}.js`),
    ])
      .pipe(plugins.concat(`adsbypasser.${featureName}.${ecmaName}.user.js`))
      .pipe(gulp.dest(output.toString()));;
  });

  return taskName;
}


function createMetadataTask (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';

  gulp.task(`userscript:metadata:${featureName}:${ecmaName}`, () => {
    return gulp.src('infra/userscript/metadata.template.js')
      .pipe(plugins.change(_.partial(finalizeMetadata, supportImage, supportLagacy)))
      .pipe(plugins.rename(`adsbypasser.${featureName}.${ecmaName}.meta.js`))
      .pipe(plugins.removeEmptyLines())
      .pipe(gulp.dest(output.toString()));
  });
}


function createBodyTask (supportImage, supportLagacy) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';
  const taskName = `userscript:body:${featureName}:${ecmaName}`;
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
          plugins: ['transform-runtime'],
          presets: ['env'],
        },
      },
    });
  }

  gulp.task(taskName, [
    `userscript:body:namespace:${featureName}`,
    `userscript:body:handlers:${featureName}`,
  ], () => {
    return gulp.src('./src/util/main.js')
      .pipe(plugins.webpack({
        resolve: {
          alias: {
            '__ADSBYPASSER_NAMESPACE__': namespacePath,
            '__ADSBYPASSER_HANDLERS__': handlersPath,
          },
          modules: [
            path.resolve(__dirname, 'src'),
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
  });
}


function createHandlersTask (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';
  const taskName = `userscript:body:handlers:${featureName}`;
  const namespaceScript = 'import { _, $ } from \'__ADSBYPASSER_NAMESPACE__\';\n';

  gulp.task(taskName, () => {
    const handlers = [
      'src/sites/file/*.js',
      'src/sites/link/*.js',
      'src/sites/paste/*.js',
    ];
    if (supportImage) {
      handlers.push('src/sites/image/*.js');
    }
    return gulp.src(handlers)
      .pipe(plugins.concat(`${featureName}.js`))
      .pipe(plugins.injectString.prepend(namespaceScript))
      .pipe(gulp.dest(output.to('handlers')));
  });
}


function createNamespaceTask (supportImage) {
  const featureName = supportImage ? 'full' : 'lite';
  const taskName = `userscript:body:namespace:${featureName}`;

  gulp.task(taskName, () => {
    return gulp.src('infra/userscript/namespace.template.js')
      .pipe(plugins.change(_.partial(finalizeNamespace, supportImage)))
      .pipe(plugins.rename(`${featureName}.js`))
      .pipe(gulp.dest(output.to('namespace')));
  });
}


function createCopyLegacyTasks (taskName) {
  const subTasks = [];
  for (const [supportImage] of imageBuildOptions()) {
    const featureName = supportImage ? 'full' : 'lite';
    const baseName = `adsbypasser${supportImage ? '' : 'lite'}`;

    for (const [part] of cartesianProductOf(['meta', 'user'])) {
      const taskName = `ghpages:copy:legacy:${featureName}:${part}`;
      gulp.task(taskName, [
        'ghpages:clone',
        'userscript',
      ], () => {
        return gulp.src(output.to(`adsbypasser.${featureName}.es7.${part}.js`))
          .pipe(plugins.rename(`${baseName}.${part}.js`))
          .pipe(gulp.dest(output.to('ghpages/releases')));
      });
      subTasks.push(taskName);
    }
  }
  gulp.task(taskName, subTasks);
}
