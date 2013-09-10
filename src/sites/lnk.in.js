// ==UserScript==
// @match          http://lnk.in/*
// ==/UserScript==

$.register({
  rule: {
    host: /lnk\.in/
  },
  run: function () {
    'use strict';

    var a = $('#divRedirectText a');
    $.redirect(a.innerHTML);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
