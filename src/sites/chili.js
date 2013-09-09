// ==UserScript==
// @match          http://imgchili.com/show/*
// @match          http://imgchili.net/show/*
// ==/UserScript==

(function () {
  'use strict';

  $.register({
    rule: {
      host: /imgchili\.(com|net)|www\.pixhost\.org/,
    },
    run: function () {
      var o = $('#show_image');
      $.redirect(o.src);
    },
  });

})();

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
