$.register({
  rule: {
    host: /^sh\.st$/,
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
    script = script.payload;

    var data = "sessionId=" + script + "&browserToken=" + Math.round(new Date().getTime() / 1000);

    var i = setInterval(function () {
      $.post('/adSession/callback', data, function (text) {
        var r = JSON.parse(text);
        if (r.status == "ok" && r.destinationUrl) {
          clearInterval(i);
          $.openLink(r.destinationUrl);
        }
      });
    }, 1000);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
