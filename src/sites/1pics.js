// ==UserScript==
// @match          http://1pics.ru/*
// ==/UserScript==

$.register({
  rule: {
    host: /1pics\.ru/,
  },
  run: function () {
    'use strict';

    var img = $('img[alt="Бесплатный фотохостинг 1Pics.Ru"]');
    $.openImage(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
