(function () {

  const hostRules = [
    // com
    /^(jnw0|cllkme|clkmein|corneey|ceesty)\.com$/,
    /^(destyy|festyy|gestyy)\.com$/,
    // else
    /^sh\.st$/,
    /^(viid|wiid|clkme)\.me$/,
  ];

  _.register({
    rule: {
      host: hostRules,
      path: /^\/freeze\/.+/,
    },
    async ready () {
      const promise = new Promise((resolve) => {
        // Wait for the timer (server-side check)
        const o = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            // If the button is now active
            if (mutation.target.getAttribute('class').match(/active/)) {
              o.disconnect();
              // Then we can redirect
              resolve(mutation.target.href);
            }
          });
        });

        o.observe($('#skip_button'), {
          attributes: true,
          attributeFilter: ['class'],
        });
      });

      const url = await promise;
      await $.openLink(url);
    },
  });

  _.register({
    rule: {
      host: hostRules,
      path: /https?:\/\//,
    },
    async start () {
      let url = window.location.pathname + window.location.search + window.location.hash;
      url = url.match(/(https?:\/\/.*)$/);
      url = url[1];
      await $.openLink(url);
    },
  });

  _.register({
    rule: {
      host: hostRules,
      path: /^\/[\d\w]+/,
    },
    async start () {
      $.window._impspcabe = 0;
    },
    async ready () {
      $.remove('iframe');
      $.removeAllTimer();

      const m = $.searchFromScripts(/sessionId: "([\d\w]+)",/);
      if (m) {
        afterGotSessionId(m[1]);
        return;
      }

      // script not loaded yet, wait until it appears
      const o = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          const m = $.searchFromScripts(/sessionId: "([\d\w]+)",/);
          if (m) {
            o.disconnect();
            afterGotSessionId(m[1]);
          }
        });
      });
      o.observe(document.body, {
        childList: true,
      });
    },
  });

  function afterGotSessionId (sessionId) {
    const X_NewRelic_ID = $.searchFromScripts(/xpid:"([^"]+)"/);

    const data = {
      adSessionId: sessionId,
    };

    const header = {
      Accept: 'application/json, text/javascript',
    };

    if (X_NewRelic_ID) {
      header['X-NewRelic-ID'] = X_NewRelic_ID;
    }

    // XXX threw away promise
    const i = setInterval(function () {
      $.get('/shortest-url/end-adsession', data, header).then(function (text) {
        const r = JSON.parse(text);
        if (r.status == 'ok' && r.destinationUrl) {
          clearInterval(i);
          $.removeAllTimer();
          const url = decodeURIComponent(r.destinationUrl);
          return $.openLink(url);
        }
      });
    }, 1000);
  }

})();
