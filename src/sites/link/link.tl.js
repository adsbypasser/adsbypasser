$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/fly\/go\.php$/,
  },
  ready: function () {
    'use strict';

    var a = $('.skip_btn2 a');
    $.openLink(a.href);
  },
});

$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink('/fly/go.php?to=' + m.path[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
