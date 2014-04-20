$.register({
  rule: {
    host: /^(www\.)?adb\.ug$/,
    // Match everything but empty, privacy, terms, contact, contact/whatever or path beginning with #
    path: /^(?!\/(?:privacy|terms|contact(\/.*)?|#.*)?$).*$/
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    // pattern 1
    var k = $.$$('script').find(function (script) {
      script = script.innerHTML;
      var m = script.match(/top\.location\.href="([^"]+)"/);
      if (!m) {
        return _.nop;
      }
      return m[1];
    });
    if (k) {
      $.openLink(k.payload);
      return;
    }

    // pattern 2
    var script = $.$$('script').find(function (v) {
      var m = v.innerHTML.match(/\{_args.+\}\}/);
      if (!m) {
        return _.nop;
      }
      return m;
    });
    if (!script) {
      throw new _.NoPicAdsError('script content changed');
    }
    script = eval('(' + script.payload[0] + ')');
    var url = window.location.pathname + '/skip_timer';

    var i = setInterval(function () {
      $.post(url, script, function (text) {
        var jj = JSON.parse(text);
        if (!jj.errors && jj.messages) {
          clearInterval(i);
          $.openLink(jj.messages.url);
        }
      });
    }, 1000);
  },
});


// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
