$.register({
  rule: {
    host: /^(www\.)?3ra\.be$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var f = unsafeWindow.fc;
    if (!f) {
      throw new _.NoPicAdsError('window.fc is undefined');
    }
    f = f.toString();
    f = f.match(/href="([^"]*)/);
    if (!f) {
      throw new _.NoPicAdsError('url pattern outdated');
    }
    $.openLink(f[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
