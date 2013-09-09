// ==UserScript==
// @match          http://lnx.lu/*
// @match          http://url.fm/*
// @match          http://z.gs/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /^lnx\.lu|url\.fm|z\.gs$/,
    },
    run: function () {
      var a = $('#clickbtn a');
      $.redirect(a.href);
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
