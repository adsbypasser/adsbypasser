(function () {
  'use strict';

  $.register({
    rule: {
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    start: function (m) {
      $.resetCookies();
      var url = decodeURIComponent(m.query[1]);
      if (url.match(/^http/)) {
        // absolute path
        $.openLink(url);
      } else {
        // related path
        $.openLink('/' + url);
      }
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
      $.window.cookieCheck = _.nop;

      h = $.window.eu;
      if (!h) {
        h = $('#adfly_bar');
        $.window.close_bar();
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

      var script = $.searchScripts('var r_url');
      var url = script.match(/&url=([^&]+)/);
      url = url[1];
      $.openLinkWithReferer(url);
    },
  });

  // Anti-bypassing used
  $.register({
    rule: {
        host: /vnl\.tuhoctoan\.net/,
        path: /^\/id\/$/,
        query: /\?l=([a-zA-Z0-9=]+)/,
    },
    start: function (m) {
      var l = atob(m.query[1]);
      $.openLink(l);
    },
  });

})();


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
