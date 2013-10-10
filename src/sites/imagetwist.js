// ==UserScript==
// @match          http://imagecherry.com/*
// @match          http://imagenpic.com/*/*.html
// @match          http://imagetwist.com/*
// @match          http://imgpo.st/*
// ==/UserScript==

$.register({
  rule: {
    host: /^image(twist|cherry|npic)\.com|imgpo\.st$/,
  },
  ready: function () {
    'use strict';

    var i = $('img.pic');
    $.replace(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
