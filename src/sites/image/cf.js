$.register({
  rule: {
    host: /^www\.x45x\.info|(imadul|mypixxx\.lonestarnaughtygirls)\.com|ghanaimages\.co|d69\.in|www\.images\.woh\.to$/,
    query: /\?p[mt]=(.+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/?di=' + m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
