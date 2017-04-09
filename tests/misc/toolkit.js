'use strict';

var _ = require('lodash');
var fs = require('fs');
var connect = require('connect');
var serveStatic = require('serve-static');

var defaultConfig = {
  version: 1,
  redirect_image: true,
  align_image: true,
};
var SERVER_PORT = 1234;
var SERVER_HREF = 'http://localhost:' + SERVER_PORT;
var SERVER_PAGE_1 = SERVER_HREF + '/misc/one.html';
var SERVER_PAGE_2 = SERVER_HREF + '/misc/two.html';

function createSandbox (window) {
  var sandbox = {};
  return {
    window: new Proxy(window, {
      set: function (target, key, value) {
        return sandbox[key] = value;
      },
      get: function (target, key) {
        if (sandbox.hasOwnProperty(key)) {
          return sandbox[key];
        } else {
          return target[key];
        }
      },
    }),
    unsafeWindow: window,
  };
}

function createGM (window, config) {
  return {
    getValue: function (key, default_) {
      if (config.hasOwnProperty(key)) {
        return config[key];
      }
      return default_;
    },
    setValue: function (key, value) {
      config[key] = value;
    },
    registerMenuCommand: function () {
    },
    xmlhttpRequest: function (options) {
      var xhr = new window.XMLHttpRequest();
      xhr.open(options.method, options.url);
      xhr.onload = options.onload;
      xhr.onerror = options.onerror;
      _.each(options.headers, function (v, k) {
        xhr.setRequestHeader(k, v);
      });
      if (options.method === 'GET') {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
      return xhr;
    },
  };
}

module.exports = {

  createFactory: function (factory) {
    return function (browser, config) {
      config = config || {};
      config = _.assign(_.clone(defaultConfig), config);
      var window = browser.tabs.current.window;
      return factory(createSandbox(window), createGM(window, config));
    };
  },

  createServer: function (done) {
    var server = connect().use(serveStatic('./tests')).use(function (req, res, next) {
      if (req.method !== 'POST') {
        next();
        return;
      }
      res.end(fs.readFileSync('./tests' + req.url));
    });
    return server.listen(SERVER_PORT, done);
  },

  page1: SERVER_PAGE_1,

  page2: SERVER_PAGE_2,

};

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
