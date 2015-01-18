(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (global) {
      var core = require('./core.js');
      return factory(global, core);
    };
  } else {
    factory(global, global._);
  }
}(this, function (global, _) {
  'use strict';

  var window = global.window;
  var document = window.document;
  var $ = global.$ || {};


  $.setCookie = function (key, value) {
    var now = new Date();
    now.setTime(now.getTime() + 3600 * 1000);
    var tpl = _.T('{0}={1};path=/;');
    document.cookie = tpl(key, value, now.toUTCString());
  };

  $.getCookie = function (key) {
    var c = _.C(document.cookie.split(';')).find(function (v) {
      var k = v.replace(/^\s*(\w+)=.+$/, '$1');
      if (k !== key) {
        return _.nop;
      }
    });
    if (!c) {
      return null;
    }
    c = c.value.replace(/^\s*\w+=([^;]+).+$/, '$1');
    if (!c) {
      return null;
    }
    return c;
  };

  $.resetCookies = function () {
    var a = document.domain;
    var b = document.domain.replace(/^www\./, '');
    var c = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2');
    var d = (new Date(1e3)).toUTCString();

    _.C(document.cookie.split(';')).each(function (v) {
      var k = v.replace(/^\s*(\w+)=.+$/, '$1');

      document.cookie = _.T('{0}=;expires={1};')(k, d);
      document.cookie = _.T('{0}=;path=/;expires={1};')(k, d);
      var e = _.T('{0}=;path=/;domain={1};expires={2};');
      document.cookie = e(k, a, d);
      document.cookie = e(k, b, d);
      document.cookie = e(k, c, d);
    });
  };


  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
