var $;
(function () {
  'use strict';

  function bootstrap (context) {

    var _ = context._;
    var window = context.window;
    var unsafeWindow = context.unsafeWindow;
    var GM = context.GM;
    var document = window.document;


    var DomNotFoundError = _.NoPicAdsError.extend({
      name: 'DomNotFoundError',
      constructor: function (selector) {
        DomNotFoundError.super.constructor.call(this, _.T('`{0}` not found')(selector));
      },
    });


    var $ = function (selector, context) {
      if (!context || !context.querySelector) {
        context = document;
      }
      var n = context.querySelector(selector);
      if (!n) {
        throw new DomNotFoundError(selector);
      }
      return n;
    };

    $.$ = function (selector, context) {
      try {
        return $(selector, context);
      } catch (e) {
        _.info(e.message);
        return null;
      }
    };

    $.$$ = function (selector, context) {
      if (!context || !context.querySelectorAll) {
        context = document;
      }
      var ns = context.querySelectorAll(selector);
      return _.C(ns);
    };


    function deepJoin (prefix, object) {
      return _.C(object).map(function (v, k) {
        var key = _.T('{0}[{1}]')(prefix, k);
        if (typeof v === 'object') {
          return deepJoin(key, v);
        }
        return _.T('{0}={1}').apply(this, [key, v].map(encodeURIComponent));
      }).join('&');
    }

    function toQuery (data) {
      if (typeof data === 'string') {
        return data;
      }
      if (data instanceof String) {
        return data.toString();
      }
      return _.C(data).map(function (v, k) {
        if (typeof v === 'object') {
          return deepJoin(k, v);
        }
        return _.T('{0}={1}').apply(this, [k, v].map(encodeURIComponent));
      }).join('&');
    }

    function ajax (method, url, data, headers, callback) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      var controller = GM.xmlhttpRequest({
        method: method,
        url: url,
        data: data,
        headers: headers,
        onload: function (response) {
          var headers = {
            get: function (key) {
              return this[key.toLowerCase()];
            },
          };
          response.responseHeaders.split(/[\r\n]+/g).filter(function (v) {
            return v.length !== 0;
          }).map(function (v) {
            return v.split(/:\s+/);
          }).forEach(function (v) {
            headers[v[0].toLowerCase()] = v[1];
          });
          callback(response.responseText, headers);
        },
      });

      return controller;
    }

    $.post = function (url, data, callback) {
      data = toQuery(data);
      return ajax('POST', url, data, {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': data.length,
      }, callback);
    };

    function go (path, params, method) {
      // Set method to post by default, if not specified.
      method = method || 'post';

      // The rest of this code assumes you are not using a library.
      // It can be made less wordy if you use one.
      var form = document.createElement('form');
      form.method = method;
      form.action = path;

      _.C(params).each(function (value, key) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    }

    $.postAndGo = function (url, data) {
      go(url, data, 'post');
    };

    $.openLink = function (to) {
      if (!to) {
        _.warn('false URL');
        return;
      }
      var from = window.location.toString();
      _.info(_.T('{0} -> {1}')(from, to));
      window.top.location.replace(to);
    };

    $.openImage = function (imgSrc) {
      if ($.config.redirectImage) {
        $.openLink(imgSrc);
      }
    };


    $.removeAllTimer = function () {
      var intervalID = window.setInterval(_.nop, 10);
      while (intervalID > 0) {
        window.clearInterval(intervalID--);
      }
    };

    $.enableScrolling = function () {
      var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
      o.style.overflow = '';
    };

    function toggleShrinking () {
      this.classList.toggle('nopicads-shrinked');
    }

    function checkScaling () {
      var nw = this.naturalWidth;
      var nh = this.naturalHeight;
      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      if ((nw > cw || nh > ch) && !this.classList.contains('nopicads-resizable')) {
        this.classList.add('nopicads-resizable');
        this.classList.add('nopicads-shrinked');

        this.addEventListener('click', toggleShrinking);
      } else {
        this.removeEventListener('click', toggleShrinking);

        this.classList.remove('nopicads-shrinked');
        this.classList.remove('nopicads-resizable');
      }
    }

    function alignCenter (d, i) {
      $.removeNodes('style, link[rel=stylesheet]');

      var imageStyle = GM.getResourceText('imageStyle');
      GM.addStyle(imageStyle);

      var bgImage = GM.getResourceURL('bgImage');
      document.body.style.backgroundImage = _.T('url(\'{0}\')')(bgImage);

      d.id = 'nopicads-wrapper';
      i.id = 'nopicads-image';

      if (i.naturalWidth && i.naturalHeight) {
        checkScaling.call(i);
      } else {
        i.addEventListener('load', checkScaling);
      }

      var h;
      window.addEventListener('resize', function () {
        window.clearTimeout(h);
        h = window.setTimeout(checkScaling.bind(i), 100);
      });
    }

    $.replace = function (imgSrc) {
      if (!imgSrc) {
        _.warn('false url');
        return;
      }
      _.info(_.T('replacing body with `{0}` ...')(imgSrc));

      $.removeAllTimer();
      $.enableScrolling();

      console.info(document.createElement('body'));
      document.body = document.createElement('body');

      var d = document.createElement('div');
      document.body.appendChild(d);

      var i = document.createElement('img');
      i.src = imgSrc;
      d.appendChild(i);

      if ($.config.alignCenter) {
        alignCenter(d, i);
      }
    };

    $.removeNodes = function (selector, context) {
      $.$$(selector, context).each(function (e) {
        e.parentNode.removeChild(e);
      });
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

    $.captcha = function (imgSrc, cb) {
      var a = document.createElement('canvas');
      var b = a.getContext('2d');
      var c = new Image();
      c.src = imgSrc;
      c.onload = function () {
        a.width = c.width;
        a.height = c.height;
        b.drawImage(c, 0, 0);
        var d = a.toDataURL();
        var e = d.substr(d.indexOf(',') + 1);
        $.post('http://www.wcpan.info/cgi-bin/captcha.cgi', {
          i: e,
        }, cb);
      };
    };


    function load () {
      var tmp = {
        version: GM.getValue('version', 0),
        alignCenter: GM.getValue('align_center', true),
        redirectImage: GM.getValue('redirect_image', true),
      };
      $.save(tmp);
      _.info('loaded config:', tmp);
      return tmp;
    }

    $.save = function (c) {
      GM.setValue('version', c.version);
      GM.setValue('align_center', c.alignCenter);
      GM.setValue('redirect_image', c.redirectImage);
    };


    var patterns = [];

    $.register = function (pattern) {
      patterns.push(pattern);
    };

    function dispatchByObject (uri, rule) {
      var matched = {};

      var passed = _.C(rule).all(function (pattern, part) {
        matched[part] = uri[part].match(pattern);
        return !!matched[part];
      });

      return passed ? matched : null;
    }

    function dispatchByRegExp (uri_1, rule) {
      var matched = uri_1.match(rule);
      return matched;
    }

    function dispatchByArray (uri_1, uri_3, uri_6, rules) {
      var matched = null;
      _.C(rules).find(function (rule) {
        if (rule instanceof RegExp) {
          // regexp
          matched = dispatchByRegExp(uri_1, rule);
        } else if (rule instanceof Array) {
          // array
          matched = dispatchByArray(uri_1, uri_3, uri_6, rule);
        } else if (typeof rule === 'function') {
          // function
          matched = dispatchByFunction(uri_1, uri_3, uri_6, rule);
        } else if (typeof rule === 'string' || rule instanceof String) {
          // string
          matched = dispatchByString(uri_3, rule);
        } else {
          // object
          matched = dispatchByObject(uri_6, rule);
        }
        return !!matched;
      });
      return matched;
    }

    function dispatchByString (uri_3, rule) {
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

      if (scheme === '*' && !/https?/.test(uri_3.scheme)) {
        return null;
      } else if (scheme !== uri_3.scheme) {
        return null;
      }

      if (scheme !== 'file' && host !== '*') {
        if (wc) {
          up = uri_3.host.indexOf(sd);
          if (up < 0 || up + sd.length === uri_3.host.length) {
            return null;
          }
        } else if (host !== uri_3.host) {
          return null;
        }
      }

      path = new RegExp(_.T('^{0}$')(path.replace(/[*.\[\]?+#]/g, function (c) {
        if (c === '*') {
          return '.*';
        }
        return '\\' + c;
      })));
      if (!uri_3.path.test(path)) {
        return null;
      }

      return uri_3;
    }

    function dispatchByFunction (uri_1, uri_3, uri_6, rule) {
      return rule(uri_1, uri_3, uri_6);
    }

    function dispatch () {
      var uri_1 = window.location.toString();
      // <scheme>://<host><path>
      var uri_3 = {
        scheme: window.location.protocol.slice(0, -1),
        host: window.location.host,
        path: window.location.pathname + window.location.search + window.location.hash,
      };
      // <scheme>//<host>:<port><path><query><hash>
      var uri_6 = {
        scheme: window.location.protocol,
        host: window.location.hostname,
        port: window.location.port,
        path: window.location.pathname,
        query: window.location.search,
        hash: window.location.hash,
      };

      var matched = null;
      var pattern = _.C(patterns).find(function (pattern) {
        var rule = pattern.rule;
        if (rule instanceof RegExp) {
          // regex
          matched = dispatchByRegExp(uri_1, rule);
        } else if (rule instanceof Array) {
          // array
          matched = dispatchByArray(uri_1, uri_3, uri_6, rule);
        } else if (typeof rule === 'function') {
          // function
          matched = dispatchByFunction(uri_1, uri_3, uri_6, rule);
        } else if (typeof rule === 'string' || rule instanceof String) {
          // string
          matched = dispatchByString(uri_3, rule);
        } else {
          // object
          matched = dispatchByObject(uri_6, rule);
        }

        return !!matched;
      });

      if (!pattern) {
        return null;
      }

      return {
        start: pattern.start ? _.P(pattern.start, matched) : _.nop,
        ready: pattern.ready ? _.P(pattern.ready, matched) : _.nop,
      };
    }

    function disableWindowOpen () {
      unsafeWindow.open = _.nop;
    }

    function disableLeavePrompt () {
      if (unsafeWindow.onbeforeunload) {
        unsafeWindow.onbeforeunload = _.nop;
      }
      if (unsafeWindow.document.body.onbeforeunload) {
        unsafeWindow.document.body.onbeforeunload = _.nop;
      }
    }

    $.main = function () {
      if (window.parent !== window.self) {
        return -1;
      }

      return setTimeout(function () {
        // <scheme>//<host>:<port><path><query><hash>
        var handler = dispatch();
        if (!handler) {
          return;
        }

        $.config = load();

        disableWindowOpen();

        handler.start();

        document.addEventListener('DOMContentLoaded', function () {
          disableLeavePrompt();
          handler.ready();
        });
      }, 0);
    };


    return $;

  }

  if (typeof module !== 'undefined') {
    module.exports = bootstrap;
  } else {
    $ = bootstrap({
      _: _,
      window: window,
      unsafeWindow: unsafeWindow,
      GM: {
        getValue: GM_getValue,
        setValue: GM_setValue,
        registerMenuCommand: GM_registerMenuCommand,
        xmlhttpRequest: GM_xmlhttpRequest,
        getResourceText: GM_getResourceText,
        addStyle: GM_addStyle,
        getResourceURL: GM_getResourceURL,
      },
    });

    $.main();
  }

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
