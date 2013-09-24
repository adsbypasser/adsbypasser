// ==UserScript==
// @match          http://dwimg.com/viewer.php?*
// ==/UserScript==

$.register({
  rule: {
    host: /dwimg\.com/,
    query: /file=([^&]+)/,
  },
  run: function (m) {
    'use strict';

    $.redirect('/files/' + m.query[1]);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
