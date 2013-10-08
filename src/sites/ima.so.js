// ==UserScript==
// @match          http://ima.so/*
// ==/UserScript==

$.register({
  rule: {
    host: /^ima\.so$/,
  },
  run: function () {
    'use strict';

    var a = $('#image_block a');
    $.openImage(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
