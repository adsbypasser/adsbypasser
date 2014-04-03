(function () {
  'use strict';

  var hostRule = /^(www\.)?adf\.(ly|acb\.im|sazlina\.com)|[jq]\.gs|go\.(phpnulledscripts|nicoblog-games)\.com|ay\.gy|(chathu|alien)\.apkmania\.co|ksn\.mx|goto\.adflytutor\.com|dl\.apkpro\.net|adf(ly\.itsrinaldo|\.tuhoctoan)\.net|.*\.gamecopyworld\.com|(dl|david)\.nhachot\.info$/;

  $.register({
    rule: {
      host: hostRule,
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $.resetCookies();
      $.openLink('/' + m.query[1]);
    },
  });

  $.register({
    rule: {
      host: hostRule,
      // FIXME this pattern is not stable
      path: /^\/([a-z\/]{2,})?$/,
    },
  });

  $.register({
    rule: {
      host: hostRule,
    },
    ready: function () {
      $.removeNodes('iframe');

      var h = unsafeWindow.eu;
      if (!h) {
        h = $('#adfly_bar');
        unsafeWindow.close_bar();
        return;
      }
      var a = h.indexOf('!HiTommy'), b = '';
      if (a >= 0) {
        h = h.substring(0, a);
      }
      a = '';
      for (var i = 0; i < h.length; ++i) {
        if (i % 2 === 0) {
          a = a + h.charAt(i);
        } else {
          b = h.charAt(i) + b;
        }
      }
      h = atob(a + b);
      h = h.substr(2);
      if (location.hash) {
        h += location.hash;
      }
      $.openLink(h);
    },
  });

  $.register({
    rule: 'http://ad7.biz/*.php',
  });

  $.register({
    rule: 'http://ad7.biz/*',
    ready: function () {
      $.removeNodes('iframe');
      $.resetCookies();

      var script = $.$$('script').find(function (v) {
        if (v.innerHTML.indexOf('var r_url') < 0) {
          return _.nop;
        }
        return v.innerHTML;
      });
      var url = script.payload.match(/&url=([^&]+)/);
      url = url[1];
      $.openLink(url);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
