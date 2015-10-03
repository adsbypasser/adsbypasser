(function() {

  // copy from Lbjs, can not get from unsafeWindow
  function ConvertFromHex (str) {
    var result = [];
    while (str.length >= 2) {
      result.push(String.fromCharCode(parseInt(str.substring(0, 2), 16)));
      str = str.substring(2, str.length);
    }
    return result.join("");
  }
  // function name MATTERS, do not change this function
  // arguments.callee does not exists in strict mode
  var Encode = function (str) {
    var s = [], j = 0, x, res = '', k = arguments.callee.toString().replace(/\s+/g, "");
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + k.charCodeAt(i % k.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
  };

  var hostRules = [
    /^(([\w]{8}|www)\.)?(allanalpass|cash4files|drstickyfingers|fapoff|freegaysitepass|(gone|tube)viral|(pic|tna)bucks|whackyvidz|fuestfka)\.com$/,
    /^(([\w]{8}|www)\.)?(a[mn]y|deb|dyo|sexpalace)\.gs$/,
    /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|ultrafiles|urlbeat|eafyfsuh)\.net$/,
    /^(([\w]{8}|www)\.)?freean\.us$/,
    /^(([\w]{8}|www)\.)?galleries\.bz$/,
    /^(([\w]{8}|www)\.)?hornywood\.tv$/,
    /^(([\w]{8}|www)\.)?link(babes|bucks)\.com$/,
    /^(([\w]{8}|www)\.)?(megaline|miniurls|qqc|rqq|tinylinks|yyv|zff)\.co$/,
    /^(([\w]{8}|www)\.)?(these(blog|forum)s)\.com$/,
    /^(([\w]{8}|www)\.)?youfap\.me$/,
    /^warning-this-linkcode-will-cease-working-soon\.www\.linkbucksdns\.com$/,
  ];

  (function () {
    'use strict';

    function generateRandomIP () {
      return [0,0,0,0].map(function () {
        return Math.floor(Math.random() * 256);
      }).join('.');
    }

    function findAdUrl () {
      var script = $.searchScripts('window[\'init\' + \'Lb\' + \'js\' + \'\']');
      if (!script) {
        return null;
      }
      var m = script.match(/AdUrl\s*:\s*'([^']+)'/);
      if (!m) {
        return null;
      }
      return m[1];
    }

    function injectFakeFrame (adurl) {
      var dummy = document.createElement('div');
      dummy.id = 'content';
      document.body.appendChild(dummy);
      // non-standard properties will be striped after xray in Firefox
      dummy = $.window.document.querySelector('#content');
      Object.defineProperty(dummy, 'tagName', {
        configurable: true,
        enumerable: false,
        value: 'iframe',
        writable: false,
      });
      Object.defineProperty(dummy, 'src', {
        configurable: true,
        enumerable: false,
        value: adurl,
        writable: false,
      });
    }

    // TODO I've to write in this style because the Firefox's xray
    // need to refactor this in future
    var ci = (typeof cloneInto !== 'function') ? function (o) {
      return o;
    } : function (o) {
      return cloneInto(o, unsafeWindow, {
        cloneFunctions: true,
        wrapReflectors: true,
      });
    };
    var ef = (typeof exportFunction !== 'function') ? function (fn) {
      return fn;
    } : function (fn) {
      return exportFunction(fn, unsafeWindow, {
        allowCrossOriginArguments: true,
      });
    };
    function inspectAjax () {
      var XHR = $.window.XMLHttpRequest;
      $.window.XMLHttpRequest = function () {
        var that = ci({});
        var xhr = new XHR();
        var resolver = null;
        var rejecter = null;
        var p = _.D(function (resolve, reject) {
          resolver = resolve;
          rejecter = reject;
        });
        p.then(function (data) {
          _.info(data);
          data = JSON.parse(data);
          if (data.Success) {
            $.openLink(data.Url);
          } else {
            _.warn('invalid request');
          }
        });
        that.open = ef(function (method, url, async, user, password) {
          return xhr.open(method, url, async, user, password);
        });
        that.send = ef(function (arg) {
          var r = xhr.send(arg);
          resolver(xhr.responseText);
          return r;
        });
        return that;
      };
    }

    $.register({
      rule: {
        host: hostRules,
        path: /^\/\w+\/url\/(.+)$/,
      },
      ready: function(m) {
        $.removeAllTimer();
        $.resetCookies();
        $.removeNodes('iframe');

        var url = m.path[1] + window.location.search;

        var match = $.searchScripts(/UrlEncoded: ([^,]+)/);
        if (match && match[1] === 'true') {
          // encrypted url
          url = Encode(ConvertFromHex(url));
        }

        $.openLink(url);
      }
    });

    $.register({
      rule: {
        host: hostRules,
      },
      start: function () {
        // looks like the original request is the most stable
        // so I do some trick to inspect XHR
        inspectAjax();
      },
      ready: function () {
        $.removeAllTimer();
        $.resetCookies();
        $.removeNodes('iframe');

        if (window.location.pathname.indexOf('verify') >= 0) {
          // NOTE dirty fix
          var path = window.location.pathname.replace('/verify', '');
          $.openLink(path);
          return;
        }

        var adurl = findAdUrl();
        if (!adurl) {
          _.warn('pattern changed');
          return;
        }
        // inject a fake frame to pass the adblock check
        // otherwise it won't send AJAX request
        injectFakeFrame(adurl);
        // touch to pass the server-side check
        $.get(adurl);
      },
    });

    // for entry script
    // this is stupid, but inspecting script on every page is too heavy
    $.register({
      rule: {
        query: /^(.*)[?&]_lbGate=\d+$/,
      },
      start: function (m) {
        $.setCookie('_lbGatePassed', 'true');
        $.openLink(window.location.pathname + m.query[1]);
      },
    });

  })();

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
