// ==UserScript==
// @match          http://imageback.info/view-image/*
// @match          http://imagepong.info/view-image/*
// ==/UserScript==

(function () {
  'use strict';

  $register({
    rule: {
      host: /image(back|pong)\.info/,
    },
    run: function () {
      $removeNodes('#popupOverlay, #divExoLayerWrapper');
      var a = $('div.span7 a');
      $redirect(a.href);
    },
  });

})();

// vim: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
