// ==UserScript==
// @match          http://imgpony.com/viewer3.php?img=*
// @match          http://imgtrick.com/viewer3.php?img=*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /img(pony|trick)\.com/,
      query: /\?img=(.+)/,
    },
    run: function (m) {
      $redirect('/images/' + m.query[1]);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
