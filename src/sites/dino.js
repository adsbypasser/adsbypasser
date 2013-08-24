// ==UserScript==
// @match          http://imgdino.com/viewer.php?file=*
// @match          http://imgtiger.com/viewer.php?file=*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /img(dino|tiger)\.com/,
    },
    run: function () {
      var o = $('#cursor_lupa');
      $redirect(o.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
