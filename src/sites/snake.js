// ==UserScript==
// @match          http://www.freebunker.com/show/*
// @match          http://www.imagesnake.com/index.php?*
// @match          http://www.imagesnake.com/show/*
// ==/UserScript==

(function () {
  'use strict';

  // first stage
  $register({
    rule: {
      host: /\.imagesnake\.com$/,
      path: /^\/index\.php$/,
      query: /^\?/,
    },
    run: function () {
      var a = $('#tablewraper a:nth-child(2)');
      $redirect(a.href);
    },
  });

  // second stage
  $register({
    rule: {
      host: /\.(imagesnake|freebunker)\.com$/,
      path: /^\/show/,
    },
    run: function () {
      unsafeWindow.onbeforeunload = null;
      var i = $('#img_obj');
      $redirect(i.src);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
