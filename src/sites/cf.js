// ==UserScript==
// @match          http://imgurban.info/?pm=*
// @match          http://d69.in/?pm=*
// ==/UserScript==

$.register({
  rule: {
    host: /imgurban\.info|d69\.in/,
  },
  run: function () {
    'use strict';

    var a = $('div.img_box a');
    $.redirect(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
