import fs from 'fs';
import path from 'path';
import stream from 'stream';
import { fileURLToPath } from 'url';

import _ from 'lodash';
import findup from 'findup-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpChange from 'gulp-change';
import gulpConcat from 'gulp-concat';
import gulpEslint from 'gulp-eslint';
import gulpInjectString from 'gulp-inject-string';
import gulpLess from 'gulp-less';
import gulpRename from 'gulp-rename';
import gulpStripComments from 'gulp-strip-comments';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const buildOptions = {
  supportImage: [true, false],
};
const packageJSON = parsePackageJSON();

// Direct plugin exports for ES modules
export const plugins = {
  change: gulpChange,
  concat: gulpConcat,
  eslint: gulpEslint,
  injectString: gulpInjectString,
  less: gulpLess,
  rename: gulpRename,
  stripComments: gulpStripComments,
  webpack: (arg) => {
    arg.mode = 'none';
    return webpackStream(arg, webpack);
  },
};
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
  yield * cartesianProductOf(buildOptions.supportImage);
}


export function * imageBuildOptions () {
  yield * cartesianProductOf(buildOptions.supportImage);
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


export function finalizeMetadata (supportImage, content) {
  const featureName = getFeatureName(supportImage);
  const featurePostfix = supportImage ? '' : ' Lite';

  let s = _.template(content);
  s = s({
    version: packageJSON.version,
    title: `AdsBypasser${featurePostfix}`,
    supportImage,
    buildName: featureName,
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


class RemoveEmptyLines extends stream.Transform {

  _transform (chunk, encoding, callback) {
    let rv = chunk.contents.toString(encoding);
    rv = rv.replace(/^\s*[\r\n]/gm, '');
    chunk.contents = Buffer.from(rv, encoding);
    callback(null, chunk);
  }

}


export function removeEmptyLines () {
  return new RemoveEmptyLines({
    objectMode: true,
  });
}
