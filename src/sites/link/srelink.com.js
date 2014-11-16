$.register({
  rule: {
    host: /^(www\.)?srelink\.com$/,
    path: /^\/i\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    $.removeNodes('iframe');

    var matches = $.searchScripts(/href="([^"]+)">SKIP AD<\/a>/);
    $.openLink(matches[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
