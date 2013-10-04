// ==UserScript==
// @match          http://emptypix.com/image/*
// @match          http://flickimg.com/image/*
// @match          http://fotohosting.net/image/*
// ==/UserScript==

$.register({
  rule: {
    host: /^(emptypix|flickimg)\.com|fotohosting\.net$/,
  },
  ready: function () {
    'use strict';

    var img = $('#full_image');
    $.redirect(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
