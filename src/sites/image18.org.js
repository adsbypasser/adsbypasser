// ==UserScript==
// @match          http://image18.org/show/*
// ==/UserScript==

$.register({
  rule: {
    host: /^image18\.org$/,
  },
  run: function () {
    'use strict';

    var img = $('#picture');
    $.redirect(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
