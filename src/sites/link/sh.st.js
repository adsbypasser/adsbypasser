(function () {
  'use strict';

  function afterGotSessionId (sessionId) {
    var X_NewRelic_ID = $.searchScripts(/xpid:"([^"]+)"/);

    var data = {
      adSessionId: sessionId,
    };

    var header = {
      Accept: 'application/json, text/javascript',
    };

    if (X_NewRelic_ID) {
      header['X-NewRelic-ID'] = X_NewRelic_ID;
    }

    var i = setInterval(function () {
      $.get('/shortest-url/end-adsession', data, header).then(function (text) {
        var r = _.parseJSON(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $.removeAllTimer();
          var url = decodeURIComponent(r.destinationUrl);
          $.openLink(url);
        }
      });
    }, 1000);
  }

  var hostRules = [
    /^sh\.st$/,
    /^(dh10thbvu|u2ks|jnw0|qaafa|xiw34|cllkme|clkmein|corneey|ceesty)\.com$/,
    /^[dfg]estyy\.com$/,
    /^digg\.to$/,
    /^([vw]iid|clkme)\.me$/,
    /^short\.est$/,
  ];

  $.register({
    rule: {
      host: hostRules,
      path: /^\/freeze\/.+/,
    },
    ready: function () {
      // Wait for the timer (server-side check)
      var o = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // If the button is now active
          if (mutation.target.getAttribute('class').match(/active/)) {
            o.disconnect();
            // Then we can redirect
            $.openLink(mutation.target.href);
          }
        });
      });

      o.observe($('#skip_button'), {
        attributes: true,
        attributeFilter: ['class'],
      });

    },
  });

  $.register({
    rule: {
      host: hostRules,
      path: /https?:\/\//,
    },
    start: function () {
      var url = window.location.pathname + window.location.search + window.location.hash;
      url = url.match(/(https?:\/\/.*)$/);
      url = url[1];
      $.openLink(url);
    },
  });

  $.register({
    rule: {
      host: hostRules,
      path: /^\/[\d\w]+/,
    },
    start: function () {
      $.window._impspcabe = 0;
    },
    ready: function () {
      $.removeNodes('iframe');
      $.removeAllTimer();

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
