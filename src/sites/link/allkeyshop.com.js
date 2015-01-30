$.register({
  rule: {
    host: /^(www\.)?allkeyshop\.com$/,
  },
  ready: function (m) {
    'use strict';

    var matches = $.searchScripts(/window\.location\.href = "([^"]+)"/);
    $.openLink(matches[1]);

    // Avoid that the page redirects when it's already loading the target page
    $.removeAllTimer();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
