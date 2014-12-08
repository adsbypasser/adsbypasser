var $;
(function () {
  'use strict';

  function bootstrap (context) {

    var _ = context._;
    var window = context.window;
    var unsafeWindow = context.unsafeWindow;
    var GM = context.GM;
    var document = window.document;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;


    var DomNotFoundError = _.AdsBypasserError.extend({
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
      // Host is not alway the same as window.location.host, for example foo.example.org can perform a request to example.org
      var l = document.createElement('a');
      l.href = url;
      var reqHost = l.hostname;
      headers.Host = reqHost || window.location.host;
      headers.Origin = window.location.origin;
      headers.Referer = window.location.href;
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

    $.toDOM = function(rawHTML) {
      try {
        var parser = new DOMParser();
        var DOMHTML = parser.parseFromString(rawHTML, "text/html");
        return DOMHTML;
      } catch (e) {
        throw new _.AdsBypasserError('could not parse HTML to DOM');
      }
    };

    $.get = function (url, data, callback, headers) {
      data = toQuery(data);
      // Don't request with '?' if there is no data
      data = data!==''? '?' + data : '';
      headers = headers || {};
      return ajax('GET', url + data, '', headers, callback);
    };

    $.post = function (url, data, callback, headers) {
      data = toQuery(data);
      var h = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': data.length,
      };
      if (headers) {
        _.C(headers).each(function (v, k) {
          h[k] = v;
        });
      }
      return ajax('POST', url, data, h, callback);
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

    $.openLinkByPost = function (url, data) {
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

    $.openLinkWithReferer = function (to) {
      if (!to) {
        _.warn('false URL');
        return;
      }
      var from = window.location.toString();
      _.info(_.T('{0} -> {1}')(from, to));

      // Create a link on the page
      var a = document.createElement('a');
      a.href = to;
      a.style.display = 'none';
      document.body.appendChild(a);

      // Simulate a click on this link (so that the referer is sent)
      a.click();
    };

    $.openImage = function (imgSrc) {
      if (config.redirectImage) {
        $.openLink(imgSrc);
      }
    };


    $.removeAllTimer = function () {
      var handle = window.setInterval(_.nop, 10);
      while (handle > 0) {
        window.clearInterval(handle--);
      }
      handle = window.setTimeout(_.nop, 10);
      while (handle > 0) {
        window.clearTimeout(handle--);
      }
    };

    $.enableScrolling = function () {
      var o = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
      o.style.overflow = '';
    };

    function toggleShrinking () {
      this.classList.toggle('adsbypasser-shrinked');
    }

    function checkScaling () {
      var nw = this.naturalWidth;
      var nh = this.naturalHeight;
      var cw = document.documentElement.clientWidth;
      var ch = document.documentElement.clientHeight;
      if ((nw > cw || nh > ch) && !this.classList.contains('adsbypasser-resizable')) {
        this.classList.add('adsbypasser-resizable');
        this.classList.add('adsbypasser-shrinked');

        this.addEventListener('click', toggleShrinking);
      } else {
        this.removeEventListener('click', toggleShrinking);

        this.classList.remove('adsbypasser-shrinked');
        this.classList.remove('adsbypasser-resizable');
      }
    }

    function scaleImage (i) {
      var style = GM.getResourceText('scaleImage');
      GM.addStyle(style);

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

    function changeBackground () {
      var bgImage = GM.getResourceURL('bgImage');
      document.body.style.backgroundColor = '#222222';
      document.body.style.backgroundImage = _.T('url(\'{0}\')')(bgImage);
    }

    function alignCenter () {
      var style = GM.getResourceText('alignCenter');
      GM.addStyle(style);
    }

    function injectStyle (d, i) {
      $.removeNodes('style, link[rel=stylesheet]');

      d.id = 'adsbypasser-wrapper';
      i.id = 'adsbypasser-image';
    }

    $.replace = function (imgSrc) {
      if (!config.redirectImage) {
        return;
      }

      if (!imgSrc) {
        _.warn('false url');
        return;
      }
      _.info(_.T('replacing body with `{0}` ...')(imgSrc));

      $.removeAllTimer();
      $.enableScrolling();

      document.body = document.createElement('body');

      var d = document.createElement('div');
      document.body.appendChild(d);

      var i = document.createElement('img');
      i.src = imgSrc;
      d.appendChild(i);

      if (config.alignCenter || config.scaleImage) {
        injectStyle(d, i);
      }
      if (config.alignCenter) {
        alignCenter();
      }
      if (config.changeBackground) {
        changeBackground();
      }
      if (config.scaleImage) {
        scaleImage(i);
      }
    };

    $.removeNodes = function (selector, context) {
      $.$$(selector, context).each(function (e) {
        e.parentNode.removeChild(e);
      });
    };

    function searchScriptsByRegExp (pattern, context) {
      var m = $.$$('script', context).find(function (s) {
        var m = s.innerHTML.match(pattern);
        if (!m) {
          return _.nop;
        }
        return m;
      });
      if (!m) {
        return null;
      }
      return m.payload;
    }

    function searchScriptsByString (pattern, context) {
      var m = $.$$('script', context).find(function (s) {
        var m = s.innerHTML.indexOf(pattern);
        if (m < 0) {
          return _.nop;
        }
        return m;
      });
      if (!m) {
        return null;
      }
      return m.value.innerHTML;
    }

    $.searchScripts = function (pattern, context) {
      if (pattern instanceof RegExp) {
        return searchScriptsByRegExp(pattern, context);
      } else if (typeof pattern === 'string') {
        return searchScriptsByString(pattern, context);
      } else {
        return null;
      }
    };

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

    $.captcha = function (imgSrc, cb) {
      if (!config.externalServerSupport) {
        return;
      }

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


    function injectClone (vaccine) {
      var injected;
      if (typeof cloneInto !== 'function') {
        injected = vaccine;
      } else {
        injected = cloneInto(vaccine, unsafeWindow, {
          cloneFunctions: true,
        });
      }
      return injected;
    }

    function injectFunction (vaccine) {
      var injected;
      if (typeof exportFunction !== 'function') {
        injected = vaccine;
      } else {
        try {
          injected = exportFunction(vaccine, unsafeWindow, {
            allowCrossOriginArguments: true,
          });
        } catch(e) {
          console.error(e);
        }
      }
      return injected;
    }

    function injectReference () {
      var injected;
      if (typeof createObjectIn !== 'function') {
        injected = {};
      } else {
        injected = createObjectIn(unsafeWindow);
      }
      return injected;
    }

    $.inject = function (vaccine) {
      if (typeof vaccine === 'function') {
        return injectFunction(vaccine);
      } else if (typeof vaccine === 'undefined') {
        return injectReference();
      } else {
        return injectClone(vaccine);
      }
    };


    var patterns = [];

    $.register = function (pattern) {
      patterns.push(pattern);
    };


    function load () {
      var tmp = {
        version: GM.getValue('version', 0),
        alignCenter: GM.getValue('align_center'),
        changeBackground: GM.getValue('change_background'),
        externalServerSupport: GM.getValue('external_server_support'),
        redirectImage: GM.getValue('redirect_image'),
        scaleImage: GM.getValue('scale_image'),
      };
      fixup(tmp);
      save(tmp);
      return tmp;
    }

    function save (c) {
      GM.setValue('version', c.version);
      GM.setValue('align_center', c.alignCenter);
      GM.setValue('change_background', c.changeBackground);
      GM.setValue('external_server_support', c.externalServerSupport);
      GM.setValue('redirect_image', c.redirectImage);
      GM.setValue('scale_image', c.scaleImage);
    }

    function fixup (c) {
      var patches = [
        function (c) {
          var ac = typeof c.alignCenter !== 'undefined';
          if (typeof c.changeBackground === 'undefined') {
            c.changeBackground = ac ? c.alignCenter : true;
          }
          if (typeof c.scaleImage === 'undefined') {
            c.scaleImage = ac ? c.alignCenter : true;
          }
          if (!ac) {
            c.alignCenter = true;
          }
          if (typeof c.redirectImage === 'undefined') {
            c.redirectImage = true;
          }
        },
        function (c) {
          if (typeof c.externalServerSupport === 'undefined') {
            c.externalServerSupport = false;
          }
        },
      ];
      while (c.version < patches.length) {
        patches[c.version](c);
        ++c.version;
      }
    }

    var config = null;

    $.register({
      rule: {
        host: /^adsbypasser\.github\.io$/,
        path: /^\/configure\.html$/,
      },
      ready: function () {

        unsafeWindow.commit = $.inject(function (data) {
          data.version = config.version;
          _.C(data).each(function (v, k) {
            config[k] = v;
          });
          // protection hack
          setTimeout(function () {
            save(data);
          }, 0);
        });

        unsafeWindow.render($.inject({
          version: config.version,
          options: {
            alignCenter: {
              type: 'checkbox',
              value: config.alignCenter,
              label: 'Align Center',
              help: 'Align image to the center if possible. (default: enabled)',
            },
            changeBackground: {
              type: 'checkbox',
              value: config.changeBackground,
              label: 'Change Background',
              help: 'Use Firefox-like image background if possible. (default: enabled)',
            },
            redirectImage: {
              type: 'checkbox',
              value: config.redirectImage,
              label: 'Redirect Image',
              help: [
                'Directly open image link if possible. (default: enabled)',
                'If disabled, redirection will only works on link shortener sites.',
              ].join('<br/>\n'),
            },
            scaleImage: {
              type: 'checkbox',
              value: config.scaleImage,
              label: 'Scale Image',
              help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
            },
            externalServerSupport: {
              type: 'checkbox',
              value: config.externalServerSupport,
              label: 'External Server Support',
              help: [
                'Send URL information to external server to enhance features (e.g.: captcha resolving). (default: disabled)',
                'Affected sites:',
                'urlz.so (captcha)',
              ].join('<br/>\n'),
            },
          },
        }));

      },
    });


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
      if (!byLocation) {
        if (typeof rule !== 'function') {
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
      if (typeof rule === 'function') {
        return null;
      }
      return dispatchByObject(rule, url_6);
    }

    function findHandler (byLocation) {
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
    }

    function disableWindowOpen () {
      unsafeWindow.open = _.nop;
    }

    function disableLeavePrompt () {
      var seal = {
        set: $.inject(function () {
          _.info('blocked onbeforeunload');
        }),
      };
      // NOTE maybe break in future Firefox release
      _.C([unsafeWindow, unsafeWindow.document.body]).each(function (o) {
        if (!o) {
          return;
        }

        // release existing events
        o.onbeforeunload = undefined;

        // prevent they bind event again
        if (isSafari) {
          // Safiri must use old-style method
          o.__defineSetter__('onbeforeunload', seal.set);
        } else {
          Object.defineProperty(o, 'onbeforeunload', $.inject(seal));
        }

        // block addEventListener
        var oael = o.addEventListener;
        var nael = function (type) {
          if (type === 'beforeunload') {
            _.info('blocked addEventListener onbeforeunload');
            return;
          }
          return oael.apply(this, arguments);
        };
        o.addEventListener = $.inject(addEventListener);
      });
    }

    $._main = function (isNodeJS) {
      delete $._main;

      if (isNodeJS) {
        config = load();
        return;
      }

      if (window.top !== window.self) {
        // skip frames
        return;
      }

      var handler = findHandler(true);
      if (handler) {
        config = load();
        _.info('working on\n%s \nwith\n%o', window.location.toString(), config);

        disableWindowOpen();

        handler.start();

        document.addEventListener('DOMContentLoaded', function () {
            disableLeavePrompt();
            handler.ready();
        });
      } else {
        _.info('does not match location on `%s`, will try HTML content', window.location.toString());

        document.addEventListener('DOMContentLoaded', function () {
          handler = findHandler(false);

          if (!handler) {
            _.info('does not match HTML content on `%s`', window.location.toString());
            return;
          }

          config = load();
          _.info('working on\n%s \nwith\n%o', window.location.toString(), config);

          disableWindowOpen();
          disableLeavePrompt();

          handler.ready();
        });
      }
    };

    GM.registerMenuCommand('AdsBypasser - Configure', function () {
      GM.openInTab('https://adsbypasser.github.io/configure.html');
    });

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
        xmlhttpRequest: GM_xmlhttpRequest,
        getResourceText: GM_getResourceText,
        addStyle: GM_addStyle,
        getResourceURL: GM_getResourceURL,
        openInTab: GM_openInTab,
        registerMenuCommand: GM_registerMenuCommand,
      },
    });
  }

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
