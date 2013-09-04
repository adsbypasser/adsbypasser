// ==UserScript==
// @match          http://coinurl.com/*
// @match          http://cur.lv/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /^coinurl\.com|cur\.lv$/,
    },
    run: function () {
      var a = $('#skip-ad');
      $.redirect(a.href);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
