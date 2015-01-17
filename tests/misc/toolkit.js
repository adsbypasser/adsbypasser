'use strict';

var Proxy = require('harmony-proxy');

var sandbox = {};

module.exports = {

  createSandbox: function (window) {
    return {
      window: new Proxy(window, {
        set: function (target, key, value) {
          if (key === '$' || key === '_') {
            return sandbox[key] = value;
          } else {
            return target[key] = value;
          }
        },
        get: function (target, key) {
          if (key === '$' || key === '_') {
            return sandbox[key];
          } else {
            return target[key];
          }
        },
      }),
      unsafeWindow: window,
    };
  },

  createGM: function (config) {
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
    };
  },

};

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
