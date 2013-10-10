// ==UserScript==
// @match          http://funkyimg.com/viewer.php?img=*
// @match          http://funkyimg.com/view/*
// ==/UserScript==

$.register({
  rule: {
    host: /^funkyimg\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $('#viewer img');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
