$.register({
  rule: {
    host: /^imgnova\.xyz$/,
    path: /^\/i\/v\.php$/,
    query: /f=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage('f/' + m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
