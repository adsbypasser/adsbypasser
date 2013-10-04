// ==UserScript==
// @include        /http://lnk\.co/.+/
// @match          http://rdlnk.co/*
// @include        /https?://reducelnk\.com/[^.]+$/
// ==/UserScript==

$.register({
  rule: {
    host: /^(rd?)lnk\.co|reducelnk\.com$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var o = $.$('#urlholder');
    if (o) {
      $.redirect(o.value);
      return;
    }

    o = $.$('#skipBtn');
    if (o) {
      o = o.querySelector('a');
      $.redirect(o.href);
      return;
    }

    o = document.title.replace(/(LNK.co|Linkbee)\s*:\s*/, '');
    $.redirect(o);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
