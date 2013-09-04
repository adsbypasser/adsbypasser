// ==UserScript==
// @match          http://*.abload.de/image.php?img=*
// @match          http://abload.de/image.php?img=*
// @match          http://fastpic.ru/view/*.html
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /^(.+\.)?abload\.de|fastpic\.ru$/,
    },
    run: function () {
      var i = $('#image');
      $.redirect(i.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
