// ==UserScript==
// @match          http://amateurfreak.org/share-*.html
// @match          http://amateurfreak.org/share.php?id=*
// @match          http://picfox.org/*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /(picfox|amateurfreak)\.org/,
    },
    run: function () {
      var o = $('#iimg');
      $redirect(o.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
