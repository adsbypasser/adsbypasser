(function () {
  'use strict';

  function getTokenFromRocketScript () {
    var a = $.searchScripts(/var eu = '(?!false)(.*)'/);
    return a ? a[1] : null;
  }

  $.register({
    rule: {
      host: /^adf\.ly$/,
      path: /^\/redirecting\/(.+)$/,
    },
    start: function (m) {
      var url = atob(m.path[1]);
      $.openLink(url);
    },
  });

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
    rule: [
      // rocket loader hack
      'http://u.shareme.in/*',
      'http://server.sbenny.com/*',

      // generic pattern
      function () {
        var h = $.$('html[id="main_html"]');
        var b = $.$('body[id="home"]');
        if (h && b) {
          return true;
        } else {
          return null;
        }
      },
    ],
    start: function () {
      // Rocket Loader will modify DOM before `ready()` can do anything,
      // so we hack `document.write` to block CloudFlare's main script.
      // after this the inline script will fail, and leave DOM alone.
      $.window.document.write = _.nop;
      // break anti-adblock script
      $.window.btoa = _.nop;
    },
    ready: function () {
      // check if this is ad page
      var h = $.$('#main_html'), b = $.$('#home');
      if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
        // this is not a ad page
        return;
      }

      $.removeNodes('iframe');

      // disable cookie check
      $.window.cookieCheck = _.nop;

      h = getTokenFromRocketScript();
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
      $.openLink(h);
    },
  });

})();
