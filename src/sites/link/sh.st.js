$.register({
  rule: {
    host: /^sh\.st|dh10thbvu\.com$/,
    path: /^\/[\d\w]+/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var script = $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/sessionId: "([\d\w]+)",/);
      if (m) {
        return m[1];
      }
      return _.nop;
    });
    if (!script) {
      throw new _.NoPicAdsError('script content changed');
    }
    var sessionId = script.payload;

    script = $.$$('script').find(function (script) {
      var m = script.innerHTML.match(/xpid:"([^"]+)"/);
      if (m) {
        return m[1];
      }
      return _.nop;
    });
    // somehow this token may not exists
    var X_NewRelic_ID = script ? script.payload : '';

    var Fingerprint = unsafeWindow.Fingerprint;
    var browserToken = null;
    if (Fingerprint) {
      browserToken = (new Fingerprint({canvas: !0})).get();
    } else {
      browserToken = Math.round((new Date()).getTime() / 1000);
    }
    var data = "sessionId=" + sessionId + "&browserToken=" + browserToken;
    var param = '?url=' + encodeURIComponent(window.location.href);

    var i = setInterval(function () {
      $.post('/adSession/callback' + param, data, function (text) {
        var r = JSON.parse(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $.openLink(r.destinationUrl);
        }
      }, {
        Accept: 'application/json, text/javascript',
        'X-NewRelic-ID': X_NewRelic_ID,
      });
    }, 1000);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
