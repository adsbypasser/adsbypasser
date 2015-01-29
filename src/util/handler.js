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


  var patterns = [];

  $.register = function (pattern) {
    patterns.push(pattern);
  };


  function dispatchByObject (rule, url_6) {
    var matched = {};

    var passed = _.C(rule).all(function (pattern, part) {
      if (pattern instanceof RegExp) {
        matched[part] = url_6[part].match(pattern);
      } else if (pattern instanceof Array) {
        // may be an array of regexp
        var r = _.C(pattern).find(function (p) {
          var m = url_6[part].match(p);
          return m || _.nop;
        });
        matched[part] = r ? r.payload : null;
      }

      return !!matched[part];
    });

    return passed ? matched : null;
  }

  function dispatchByRegExp (rule, url_1) {
    return url_1.match(rule);
  }

  function dispatchByArray (byLocation, rules, url_1, url_3, url_6) {
    var tmp = _.C(rules).find(function (rule) {
      var m = dispatch(byLocation, rule, url_1, url_3, url_6);
      if (!m) {
        return _.nop;
      }
      return m;
    });
    return tmp ? tmp.payload : null;
  }

  function dispatchByString (rule, url_3) {
    // <scheme> := '*' | 'http' | 'https' | 'file' | 'ftp' | 'chrome-extension'
    var scheme = /\*|https?|file|ftp|chrome-extension/;
    // <host> := '*' | '*.' <any char except '/' and '*'>+
    var host = /\*|(\*\.)?([^\/*]+)/;
    // <path> := '/' <any chars>
    var path = /\/.*/;
    // <url-pattern> := <scheme>://<host><path>
    var up = new RegExp(_.T('^({scheme})://({host})?({path})$')({
      scheme: scheme.source,
      host: host.source,
      path: path.source,
    }));
    var matched = rule.match(up);

    if (!matched) {
      return null;
    }

    scheme = matched[1];
    host = matched[2];
    var wc = matched[3];
    var sd = matched[4];
    path = matched[5];

    if (scheme === '*' && !/https?/.test(url_3.scheme)) {
      return null;
    } else if (scheme !== url_3.scheme) {
      return null;
    }

    if (scheme !== 'file' && host !== '*') {
      if (wc) {
        up = url_3.host.indexOf(sd);
        if (up < 0 || up + sd.length !== url_3.host.length) {
          return null;
        }
      } else if (host !== url_3.host) {
        return null;
      }
    }

    path = new RegExp(_.T('^{0}$')(path.replace(/[*.\[\]?+#]/g, function (c) {
      if (c === '*') {
        return '.*';
      }
      return '\\' + c;
    })));
    if (!path.test(url_3.path)) {
      return null;
    }

    return url_3;
  }

  function dispatchByFunction (rule, url_1, url_3, url_6) {
    return rule(url_1, url_3, url_6);
  }

  function dispatch (byLocation, rule, url_1, url_3, url_6) {
    // recursively dispatching
    if (rule instanceof Array) {
      return dispatchByArray(byLocation, rule, url_1, url_3, url_6);
    }

    // dispatch by HTML content
    if (typeof rule === 'function') {
      if (byLocation) {
        return null;
      }
      return dispatchByFunction(rule, url_1, url_3, url_6);
    }

    // dispatch by URL
    if (rule instanceof RegExp) {
      return dispatchByRegExp(rule, url_1);
    }
    if (typeof rule === 'string' || rule instanceof String) {
      return dispatchByString(rule, url_3);
    }
    return dispatchByObject(rule, url_6);
  }

  $._findHandler = function (byLocation) {
    var url_1 = window.location.toString();
    // <scheme>://<host><path>
    var url_3 = {
      scheme: window.location.protocol.slice(0, -1),
      host: window.location.host,
      path: window.location.pathname + window.location.search + window.location.hash,
    };
    // <scheme>//<host>:<port><path><query><hash>
    var url_6 = {
      scheme: window.location.protocol,
      host: window.location.hostname,
      port: window.location.port,
      path: window.location.pathname,
      query: window.location.search,
      hash: window.location.hash,
    };

    var pattern = _.C(patterns).find(function (pattern) {
      var m = dispatch(byLocation, pattern.rule, url_1, url_3, url_6);
      if (!m) {
        return _.nop;
      }
      return m;
    });
    if (!pattern) {
      return null;
    }

    var matched = pattern.payload;
    pattern = pattern.value;

    // exclude rule
    if (!pattern.start && !pattern.ready) {
      return null;
    }

    return {
      start: pattern.start ? _.P(pattern.start, matched) : _.nop,
      ready: pattern.ready ? _.P(pattern.ready, matched) : _.nop,
    };
  };

  return $;

}));


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
