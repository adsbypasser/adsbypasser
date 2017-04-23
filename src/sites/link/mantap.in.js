$.register({
  rule: {
    host: [
      /^mant[ae][pb]\.in$/,
      /^st\.oploverz\.net$/,
      /^minidroid\.net$/,
      /^ww3\.awaremmxv\.com$/,
      /^linkpoi\.in$/,
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
