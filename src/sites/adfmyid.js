// ==UserScript==
// @match          http://adf.my.id/*
// @match          http://riurl.com/*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /adf\.my\.id|riurl\.com/,
    },
    run: function () {
      var s = $_('body script');
      if (s) {
        s = s.innerHTML.indexOf('window.location.replace');
        if (s >= 0) {
          // let inline script redirect
          return;
        }
      }
      $postTo('', {
        hidden: '1',
        image: ' ',
      });
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
