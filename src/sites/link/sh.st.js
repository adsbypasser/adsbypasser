(function () {
  'use strict';

  function afterGotSessionId (sessionId) {
    var X_NewRelic_ID = $.searchScripts(/xpid:"([^"]+)"/);
    // this is an unsafe function
    var Fingerprint = unsafeWindow.Fingerprint;
    var browserToken = null;
    if (Fingerprint) {
      browserToken = (new Fingerprint($.inject({canvas: !0}))).get();
    } else {
      browserToken = Math.round((new Date()).getTime() / 1000);
    }
    var data = "sessionId=" + sessionId + "&browserToken=" + browserToken;
    var header = {
      Accept: 'application/json, text/javascript',
    };
    if (X_NewRelic_ID) {
      header['X-NewRelic-ID'] = X_NewRelic_ID;
    }

    var i = setInterval(function () {
      $.get('/adSession/callback', data, header).then(function (text) {
        var r = JSON.parse(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $.openLink(r.destinationUrl);
        }
      });
    }, 1000);
  }

  $.register({
    rule: {
      host: /^sh\.st|(dh10thbvu|u2ks|jnw0)\.com$/,
      path: /^\/[\d\w]+/,
    },
    ready: function () {
      $.removeNodes('iframe');

      var m = $.searchScripts(/sessionId: "([\d\w]+)",/);
      if (m) {
        afterGotSessionId(m[1]);
        return;
      }

      // script not loaded yet, wait until it appears
      var o = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          var m = $.searchScripts(/sessionId: "([\d\w]+)",/);
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

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
