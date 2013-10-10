// ==UserScript==
// @match          http://www.2i.sk/*
// @match          http://www.2imgs.com/*
// ==/UserScript==

$.register({
  rule: {
    host: /2i\.sk|2imgs\.com/,
  },
  ready: function () {
    'use strict';

    var img = $('#wrap3 img');
    $.openImage(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
