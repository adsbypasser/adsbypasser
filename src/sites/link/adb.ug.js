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
    var m = $.searchScripts(/top\.location\.href="([^"]+)"/);
    if (m) {
      $.openLink(m[1]);
      return;
    }

    // pattern 2
    m = $.searchScripts(/\{_args.+\}\}/);
    if (!m) {
      throw new _.NoPicAdsError('script content changed');
    }
    m = eval('(' + m[0] + ')');
    var url = window.location.pathname + '/skip_timer';

    var i = setInterval(function () {
      $.post(url, m, function (text) {
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
