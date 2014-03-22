(function () {
  'use strict';

  $.register({
    rule: {
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $.resetCookies();
      $.openLink('/' + m.query[1]);
    },
  });

  $.register({
    rule: function () {
      var h = $.$('html[id="adfly_html"]');
      var b = $.$('body[id="home"]');
      if (h && b) {
        return true;
      } else {
        return null;
      }
    },
    ready: function () {
      // check if this is ad page
      var h = $.$('#adfly_html'), b = $.$('#home');
      if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
        // this is not a ad page
        return;
      }

      $.removeNodes('iframe');

      // disable cookie check
      unsafeWindow.cookieCheck = $.inject(_.nop);

      h = unsafeWindow.eu;
      if (!h) {
        h = $('#adfly_bar');
        unsafeWindow.close_bar();
        return;
      }
      var a = h.indexOf('!HiTommy');
      if (a >= 0) {
        h = h.substring(0, a);
      }
      a = '';
      b = '';
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
      // some sites need Referer header
      $.openLinkWithReferer(h);
    },
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
