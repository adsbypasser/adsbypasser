$.register({
  rule: {
    host: /^imagik\.fr$/,
    path: /^\/view(-rl)?\/(.+)/,
  },
  start: function (m) {
    'use strict';

    // mimetype is text/plain
    $.openImage('/uploads/' + m.path[2]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
