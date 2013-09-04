// ==UserScript==
// @match          http://imagecherry.com/*
// @match          http://imgpo.st/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /imagecherry\.com|imgpo\.st/,
    },
    run: function () {
      var o = $('img.pic');
      // somehow the server send image as an attachment
      // so I replace whole document.body with single img
      $.replaceBody(o.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
