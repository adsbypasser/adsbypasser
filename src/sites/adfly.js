(function () {
  'use strict';

  var hostRule = /^adf\.ly|u\.bb|[jq]\.gs|go\.phpnulledscripts\.com|chathu\.apkmania\.co$/;

  $.register({
    rule: {
      host: hostRule,
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $.resetCookies();
      $.openLink(m.query[1]);
    },
  });

  $.register({
    rule: {
      host: hostRule,
    },
    ready: function () {
      $.removeNodes('iframe');
      $.resetCookies();

      var h = unsafeWindow.eu, b64 = unsafeWindow.Base64;
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
      h = b64.decode(a + b);
      h = h.substr(2);
      if (location.hash) {
        h += location.hash;
      }
      $.openLink(h);
    },
  });

  $.register({
    rule: 'http://ad7.biz/*',
    ready: function () {
      $.removeNodes('iframe');
      $.resetCookies();

      var script = $.$$('script').find(function (v) {
        return v.innerHTML.indexOf('var r_url') >= 0;
      });
      var url = script.innerHTML.match(/&url=([^&]+)/);
      url = url[1];
      $.openLink(url);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
