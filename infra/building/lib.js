import fs from 'fs';

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
const plugins = gulpLoadPlugins({
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


function * allBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportImage, buildOptions.supportLegacy);
}


function * imageBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportImage);
}


function parsePackageJSON () {
  const p = findup('package.json');
  const pkg = fs.readFileSync(p, {
    encoding: 'utf-8',
  });
  return JSON.parse(pkg);
}


function finalizeMetadata (supportImage, supportLagacy, content) {
  const featureName = supportImage ? 'full' : 'lite';
  const ecmaName = supportLagacy ? 'es5' : 'es7';
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


function finalizeNamespace (supportImage, content) {
  let s = _.template(content);
  s = s({
    supportImage,
  });
  return s;
}


function finalizeHTML (options, content) {
  let s = _.template(content);
  s = s(options);
  return s;
}


export {
  allBuildOptions,
  cartesianProductOf,
  finalizeHTML,
  finalizeMetadata,
  finalizeNamespace,
  imageBuildOptions,
  plugins,
};
