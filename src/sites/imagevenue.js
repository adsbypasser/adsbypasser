// ==UserScript==
// @match          http://*.imagevenue.com/img.php?*
// @match          http://www.hostingfailov.com/photo/*
// @match          http://www.freeporndumpster.com/show.php?*
// ==/UserScript==

// I don't think these sites are the same
$.register({
  rule: {
    host: /(hostingfailov|freeporndumpster|imagevenue)\.com$/,
  },
  run: function () {
    'use strict';

    var i = $('#thepic');
    $.redirect(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
