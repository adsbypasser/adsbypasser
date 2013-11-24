$.register({
  rule: {
    host: /cliquesbr\.com\.br$/,
    path: /^\/\d+$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var s = $('#content script');
    s = s.innerHTML;
    s = s.match(/a href="([^"]+)"/);
    s = s[1];

    $.openLink(s);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
