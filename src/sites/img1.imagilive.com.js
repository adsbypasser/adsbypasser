// ==UserScript==
// @match          http://img1.imagilive.com/*/*
// ==/UserScript==

$.register({
  rule: {
    host: /^img1\.imagilive\.com$/,
  },
  ready: function () {
    'use strict';

    var a = $.$('#page a.button');
    if (a) {
      $.redirect(a.href);
      return;
    }

    var i = $('#page > img:not([id])');
    $.redirect(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
