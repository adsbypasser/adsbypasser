// ==UserScript==
// @match          http://emptypix.com/image/*
// ==/UserScript==

$.register({
  rule: {
    host: /emptypix\.com/,
  },
  run: function () {
    'use strict';

    var img = $('#full_image');
    $.redirect(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
