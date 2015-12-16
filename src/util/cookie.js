(function (context, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = function (context) {
      var core = require('./core.js');
      return factory(context, core);
    };
  } else {
    factory(context, context._);
  }
}(this, function (context, _) {
  'use strict';

  var window = context.window;
  var document = window.document;
  var $ = context.$ || {};


  $.setCookie = function (key, value) {
    var now = new Date();
    now.setTime(now.getTime() + 3600 * 1000);
    var tpl = _.T('{0}={1};path={2};');
    document.cookie = tpl(key, value, window.location.pathname, now.toUTCString());
  };

  $.getCookie = function (key) {
    var c = _.C(document.cookie.split(';')).find(function (v) {
      var k = v.replace(/^\s*([a-zA-Z0-9-]+)=.+$/, '$1');
      if (k !== key) {
        return _.none;
      }
    });
    if (!c) {
      return null;
    }
    c = c.value.replace(/^\s*[a-zA-Z0-9-]+=([^;]+).?$/, '$1');
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
