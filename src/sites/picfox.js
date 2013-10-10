// ==UserScript==
// @match          http://amateurfreak.org/share-*.html
// @match          http://amateurfreak.org/share.php?id=*
// @match          http://images.maxigame.by/share-*.html
// @match          http://picfox.org/*
// @match          http://www.euro-pic.eu/share.php?id=*
// @match          http://www.gratisimage.dk/share-*.html
// @match          http://xxx.freeimage.us/share.php?id=*
// ==/UserScript==

$.register({
  rule: {
    host: /^(picfox|amateurfreak)\.org|www\.euro-pic\.eu|xxx\.freeimage\.us|www\.gratisimage\.dk|images\.maxigame\.by$/,
  },
  ready: function () {
    'use strict';

    var o = $('#iimg');
    $.openImage(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
