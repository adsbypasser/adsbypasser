// ==UserScript==
// @include        /http://imageban\.(ru|net)/show/\d{4}/\d{2}/\d{2}/.+/
// ==/UserScript==

$.register({
  rule: {
    host: /^imageban\.(ru|net)$/,
  },
  run: function () {
    'use strict';

    var i = $('#img_obj');
    $.redirect(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
