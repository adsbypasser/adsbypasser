$.register({
  rule: {
    host: [
      /^mant[ae][pb]\.in$/,
      /^st\.oploverz\.net$/,
      /^minidroid\.net$/,
      /^ww3\.awaremmxv\.com$/,
    ],
  },
  ready: function () {
    'use strict';

    var a = $('a.redirect, a[target=_blank][rel=nofollow]');
    $.openLink(a.href);
  },
});

$.register({
  rule: {
    host: /^susutin\.com$/,
  },
  ready: function () {
    'use strict';

    var s = $.searchScripts(/="([^"]+)",/);
    $.openLink(s[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
