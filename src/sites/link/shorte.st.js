/**
 * @domain ceesty.com
 * @domain clkmein.com
 * @domain cllkme.com
 * @domain corneey.com
 * @domain destyy.com
 * @domain festyy.com
 * @domain gestyy.com
 * @domain sh.st
 */
(function () {
  const hostRules = [
    /^(cllkme|clkmein|corneey|ceesty)\.com$/,
    /^(destyy|festyy|gestyy)\.com$/,
    // else
    /^sh\.st$/,
  ];

  _.register({
    rule: {
      host: hostRules,
      path: /^\/[\d\w]+/,
    },
    async ready() {
      $.remove("iframe");
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

  function afterGotSessionId(sessionId) {
    const X_NewRelic_ID = $.searchFromScripts(/xpid:"([^"]+)"/);

    const data = {
      adSessionId: sessionId,
    };

    const header = {
      Accept: "application/json, text/javascript",
    };

    if (X_NewRelic_ID) {
      header["X-NewRelic-ID"] = X_NewRelic_ID;
    }

    const i = setInterval(function () {
      $.get("/shortest-url/end-adsession", data, header).then(function (text) {
        const r = JSON.parse(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $.removeAllTimer();
          const url = decodeURIComponent(r.destinationUrl);
          return $.openLink(url);
        }
      });
    }, 1000);
  }
})();
