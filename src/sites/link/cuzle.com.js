$.register({
  rule: {
    host: [
      /^www\.cuzle\.com$/,
      /^shorten\.id$/,
    ],
    path: /^\/$/,
    query: /^\?(.+)=$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.query[1]);
    $.openLink(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
