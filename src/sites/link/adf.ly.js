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
      // reset cookies
      $.resetCookies();
      $.setCookie('FLYSESSID', generateRandomSessionCookie(40));

      const url = decodeURIComponent(m.query[1]);
      if (url.match(/^http/)) {
        // absolute path
        await $.openLink(url);
      } else {
        // cannot rely on url
        await $.openLink(document.referrer);
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
    },
    async ready () {
      $.remove('iframe');
      // cheat the session
      $.setCookie('FLYSESSID', generateRandomSessionCookie(40));
      let rv = await $.get(location.href, '', {
        'Origin': _.none,
        'Referer': _.none,
        'X-Requested-With': _.none,
      });
      rv = $.toDOM(rv);
      rv = $.searchFromScripts(/var ysmm = '([^']+)'/, rv);
      rv = rv[1];
      rv = decodeToken(rv);
      await $.openLink(rv);
    },
  });


  function generateRandomSessionCookie (length) {
    const rv = [];
    for (let i = 0; i < length; ++i) {
      rv.push(Math.random().toString(36).charAt(2));
    }
    return rv.join('');
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

})();
