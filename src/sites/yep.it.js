// ==UserScript==
// @match          http://yep.it/preview.php?p=*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /yep\.it/
    },
    run: function () {
      var link = $('font[color="grey"]').innerHTML;
      $.redirect(link);
    }
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
