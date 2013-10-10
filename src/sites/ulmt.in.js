$.register({
  rule: {
    host: /^ulmt\.in$/,
  },
  ready: function () {
    'use strict';

    var s = unsafeWindow.CountdownTimer.toString();
    s = s.match(/href="([^"]+)"/);
    if (s) {
      $.openLink(s[1]);
      throw new _.NoPicAdsError('function changed');
    }
    s = $('#iframe_win');
    $.openLink(s.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
