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
      // HACK these sites need to run start-handlers at the right time
      {
        host: [
          /^adf\.ly$/,
          /^u\.shareme\.in$/,
          /^server\.sbenny\.com$/,
          /^bluenik\.com$/,
        ],
      },
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

      waitToken().then(function (token) {
        var url = decodeToken(token);
        $.openLink(url);
      }).catch(function (e) {
        _.warn(e);
      });
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
      h = decodeToken(h);
      $.openLink(h);
    },
  });


  function waitToken () {
    return _.D(function (resolve) {
      var o = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          _.C(mutation.addedNodes).each(function (node) {
            if (node.localName === 'script') {
              var m = node.textContent.match(/var ysmm = '([^']+)'/);
              if (m) {
                o.disconnect();
                resolve(m[1]);
              }
            }
          });
        });
      });
      o.observe(document.head, {
        childList: true,
      });
    });
  }


  function decodeToken (token) {
    var a = token.indexOf('!HiTommy');
    if (a >= 0) {
      token = token.substring(0, a);
    }
    a = '';
    var b = '';
    for (var i = 0; i < token.length; ++i) {
      if (i % 2 === 0) {
        a = a + token.charAt(i);
      } else {
        b = token.charAt(i) + b;
      }
    }
    token = atob(a + b);
    token = token.substr(2);
    if (location.hash) {
      token += location.hash;
    }
    return token;
  }

})();
