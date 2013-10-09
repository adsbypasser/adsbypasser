$.register({
  rule: {
    host: /^img(dino|tiger)\.com$/,
    path: /^\/viewer\.php$/,
    query: /^\?file=/,
  },
  run: function () {
    'use strict';

    var o = $('#cursor_lupa');
    $.redirect(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
