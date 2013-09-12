// ==UserScript==
// @match          http://thinfi.com/*
// ==/UserScript==

$.register({
  rule: {
    host: /thinfi\.com/
  },
  run: function () {
    'use strict';
    var a = $('div p a');
    $.redirect(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
