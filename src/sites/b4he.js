// ==UserScript==
// @match          http://b4he.com/?v=*
// @match          http://fastpics.net/?v=*
// @match          http://freeimgup.com/?v=*
// ==/UserScript==

$.register({
  rule: {
    host: /^b4he\.com|fastpics\.net|freeimgup\.com$/,
    query: /v=([^&]+)/,
  },
  run: function (m) {
    'use strict';

    $.redirect('/images/' + m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
