// ==UserScript==
// @match          http://www.digitalfrenzy.net/*.html
// ==/UserScript==

$.register({
  rule: {
    host: /digitalfrenzy\.net/,
  },
  ready: function () {
    'use strict';

    var img = $('#share_image img');
    $.openImage(img.src);
  },
});

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
