// ==UserScript==
// @match          http://hotshorturl.com/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /hotshorturl\.com/
    },
    run: function () {
      var frame = $('frame:not([name])');
      $.redirect(frame.src);
    }
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
