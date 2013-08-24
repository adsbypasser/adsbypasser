// ==UserScript==
// @match          http://www.adultmove.info/*/*/*.html
// @match          http://www.h-animes.info/*/*/*.html
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /www\.(h-animes|adultmove)\.info/,
    },
    run: function () {
      var a = $('.dlbutton2 > a');
      $redirect(a.href);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
