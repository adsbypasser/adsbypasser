// ==UserScript==
// @match          http://bridgeurl.com/*
// ==/UserScript==

$.register({
  rule: {
    host: /bridgeurl\.com/,
  },
  run: function () {
    'use strict';

    var url = unsafeWindow.urls[1];
    $.redirect(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
