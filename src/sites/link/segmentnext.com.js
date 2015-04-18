$.register({
  rule: {
    host: /^segmentnext\.com$/,
    path: /^\/interstitial\.html$/,
    query: /return_url=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openLink(decodeURIComponent(m.query[1]));
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
