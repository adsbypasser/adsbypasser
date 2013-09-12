// ==UserScript==
// @match          http://unfake.it/*
// ==/UserScript==

$.register({
  rule: {
    host: /unfake\.it/,
  },
  run: function () {
    'use strict';

    var frame = $('frame');
    var i = frame.src.lastIndexOf('http://');
    $.redirect(frame.src.substr(i));
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
