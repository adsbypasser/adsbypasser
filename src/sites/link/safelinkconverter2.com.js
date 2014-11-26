$.register({
  rule: {
    host: /^(www\.)?safelinkconverter2\.com$/,
    path: /^\/decrypt-\d\/$/,
    query: /id=(\w+==)/,
  },
  ready: function (m) {
    'use strict';
    
    $.openLink(window.atob(m.query[1]));
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
