// ==UserScript==
// @match          http://unfake.it/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /unfake\.it/
    },
    run: function () {
      var frame = $.$$('frame').find(function(frame) {
        return frame.src.lastIndexOf('http://') === 0;
      });
      $.redirect(frame.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
