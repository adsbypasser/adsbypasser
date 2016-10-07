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
    /^(([\w]{8}|www)\.)?(filesonthe|poontown|seriousdeals|ultrafiles|urlbeat|eafyfsuh|sasontnwc|zatnawqy|zytpirwai)\.net$/,
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

    function findToken (context) {
      var script = $.searchScripts('    var f = window[\'init\' + \'Lb\' + \'js\' + \'\']', context);
      if (!script) {
        _.warn('pattern changed');
        return null;
      }

      var adurl = script.match(/AdUrl\s*:\s*'([^']+)'/);
      if (!adurl) {
        return null;
      }
      adurl = adurl[1];

      var m1 = script.match(/AdPopUrl\s*:\s*'.+\?[^=]+=([\w\d]+)'/);
      var m2 = script.match(/Token\s*:\s*'([\w\d]+)'/);
      var token = m1[1] || m2[1];
      var m = script.match(/=\s*(\d+);/);
      var ak = parseInt(m[1], 10);
      var re = /\+\s*(\d+);/g;
      var tmp = null;
      // get second (i.e. the real) salt
      while((m = re.exec(script)) !== null) {
        tmp = m[1];
      }
      ak += parseInt(tmp, 10);

      return {
        t: token,
        aK: ak,
        adurl: adurl,
      };
    }

    function sendRequest (token) {
      // touch the ad url to pass the server-side check
      $.get(token.adurl);
      delete token.adurl;

      token.a_b = false;

      _.info('waiting the interval');

      return _.wait(5000).then(function () {
        _.info('sending token: %o', token);

        return $.get('/intermission/loadTargetUrl', token, {
          // strip additional headers
          'X-Requested-With': _.none,
          Origin: _.none,
        });
      }).then(function (text) {
        var data = _.parseJSON(text);
        _.info('response: %o', data);

        if (!data.Success && data.Errors[0] === 'Invalid token') {
          // somehow this token is invalid, reload to get new one
          _.warn('got invalid token');
          return retry();
        }
        if (data.AdBlockSpotted) {
          _.warn('adblock spotted');
          return;
        }
        if (data.Success && !data.AdBlockSpotted && data.Url) {
          return data.Url;
        }
      });
    }

    function retry () {
      return $.get(window.location.toString(), {}, {
        // trick the server to avoid possible survey page
        'X-Forwarded-For': $.generateRandomIP(),
      }).then(function (text) {
        var d = $.toDOM(text);
        var t = findToken(d);
        if (!t) {
          // if still fail, request again.
          // wait a second to avoid flooding detection
          return _.wait(1000).then(retry);
        }
        return sendRequest(t);
      });
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
        // avoid additional request
        $.window.XMLHttpRequest = _.nop;
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

        var token = findToken(document);
        sendRequest(token).then(function (url) {
          $.nuke();
          $.openLink(url);
        });
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
