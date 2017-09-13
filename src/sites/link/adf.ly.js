(function () {

  _.register({
    rule: {
      host: /^adf\.ly$/,
      path: /^\/redirecting\/(.+)$/,
    },
    async start (m) {
      const url = atob(m.path[1]);
      await $.openLink(url);
    },
  });

  _.register({
    rule: {
      path: /\/locked$/,
      query: /url=([^&]+)/,
    },
    async start (m) {
      $.resetCookies();
      const url = decodeURIComponent(m.query[1]);
      if (url.match(/^http/)) {
        // absolute path
        await $.openLink(url);
      } else {
        // related path
        await $.openLink('/' + url);
      }
    },
  });

  _.register({
    // generic pattern
    rule () {
      const h = $.$('html[id="main_html"]');
      if (h) {
        return true;
      } else {
        return null;
      }
    },
    async start () {
      // Rocket Loader will modify DOM before `ready()` can do anything,
      // so we hack `document.write` to block CloudFlare's main script.
      // after this the inline script will fail, and leave DOM alone.
      $.window.document.write = _.nop;
      // break anti-adblock script
      $.window.btoa = _.nop;

      await waitDocumentHead();
      const token = await waitToken();
      const url = decodeToken(token);
      await $.openLink(url);
    },
    async ready () {
      // check if this is ad page
      const h = $.$('#main_html'), b = $.$('#home');
      if (!h || !b || h.nodeName !== 'HTML' || b.nodeName !== 'BODY') {
        // this is not a ad page
        return;
      }

      $.remove('iframe');

      // disable cookie check
      $.window.cookieCheck = _.nop;

      let token = getTokenFromRocketScript();
      if (!token) {
        token = $('#adfly_bar');
        $.window.close_bar();
        return;
      }
      token = decodeToken(token);
      await $.openLink(token);
    },
  });


  function waitToken () {
    return new Promise((resolve) => {
      const o = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          _.forEach(mutation.addedNodes, (node) => {
            if (node.localName === 'script') {
              const m = node.textContent.match(/var ysmm = '([^']+)'/);
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


  function waitDocumentHead () {
    return new Promise((resolve) => {
      if (document.head) {
        resolve();
        return;
      }
      const o = new MutationObserver(() => {
        if (document.head) {
          o.disconnect();
          resolve();
        }
      });
      o.observe(document.documentElement, {
        childList: true,
      });
    });
  }


  function decodeToken (token) {
    let a = '';
    let b = '';
    for (let i = 0; i < token.length; ++i) {
      if (i % 2 === 0) {
        a = a + token.charAt(i);
      } else {
        b = token.charAt(i) + b;
      }
    }
    token = a + b;
    a = token.split('');
    for (let i = 0; i < a.length; ++i) {
      if (/\d/.test(a[i])) {
        for (let j = i + 1; j < a.length; ++j) {
          if (/\d/.test(a[j])) {
            b = a[i] ^ a[j];
            if (b < 10) {
              a[i] = b;
            }
            i = j;
            j = a.length;
          }
        }
      }
    }
    token = a.join('');
    token = atob(token);
    token = token.substring(16);
    token = token.substring(0, token.length - 16);

    if (location.hash) {
      token += location.hash;
    }
    return token;
  }


  function getTokenFromRocketScript () {
    const a = $.searchFromScripts(/const eu = '(?!false)(.*)'/);
    return a ? a[1] : null;
  }

})();
