import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import findup from 'findup-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';


const buildOptions = {
  supportImage: [true, false],
  supportLegacy: [false, true],
};
const packageJSON = parsePackageJSON();
// Map `webpack-stream` to `webpack`, instead of `webpackStream`.
export const plugins = gulpLoadPlugins({
  overridePattern: false,
  pattern: [
    'webpack-stream',
  ],
  rename: {
    'webpack-stream': 'webpack',
  },
  // Tell `webpack-stream` to use latest webpack.
  postRequireTransforms: {
    webpack (owp) {
      return (arg) => {
        arg.mode = 'none';
        return owp(arg, webpack);
      };
    },
  },
});
export const source = {
  get path () {
    return path.resolve(__dirname, '..');
  },
  to (path_) {
    return path.resolve(this.path, path_);
  },
};
export const output = {
  get path () {
    return path.resolve(__dirname, '../dist');
  },
  to (path_) {
    return path.resolve(this.path, path_);
  },
};


function * cartesianProductOf (...args) {
  if (args.length < 1) {
    yield [];
    return;
  }

  const headSubList = args[0];
  for (const item of headSubList) {
    const tailLists = args.slice(1);
    for (const items of cartesianProductOf(...tailLists)) {
      yield [item].concat(items);
    }
  }
}


export function * allBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportImage, buildOptions.supportLegacy);
}


export function * ecmaBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportLegacy);
}


export function * imageBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportImage);
}


export function getEcmaName (supportLegacy) {
  return supportLegacy ? 'es5' : 'es7';
}


export function getFeatureName (supportImage) {
  return supportImage ? 'full' : 'lite';
}


function parsePackageJSON () {
  const p = findup('package.json');
  const pkg = fs.readFileSync(p, {
    encoding: 'utf-8',
  });
  return JSON.parse(pkg);
}


export function finalizeMetadata (supportImage, supportLagacy, content) {
  const featureName = getFeatureName(supportImage);
  const ecmaName = getEcmaName(supportLagacy);
  const featurePostfix = supportImage ? '' : ' Lite';
  const ecmaPostfix = !supportLagacy ? '' : ' Legacy';

  let s = _.template(content);
  s = s({
    version: packageJSON.version,
    title: `AdsBypasser${featurePostfix}${ecmaPostfix}`,
    supportImage,
    buildName: `${featureName}.${ecmaName}`,
  });
  s = [
    '// ==UserScript==\n',
    s,
    '// ==/UserScript==\n',
  ];
  return s.join('');
}


export function finalizeNamespace (supportImage, content) {
  let s = _.template(content);
  s = s({
    supportImage,
  });
  return s;
}


export function finalizeHTML (options, content) {
  let s = _.template(content);
  s = s(options);
  return s;
}


export function createNamedTask (name, task, ...args) {
  const fn = _.partial(task, ...args);
  fn.displayName = name;
  return fn;
}
