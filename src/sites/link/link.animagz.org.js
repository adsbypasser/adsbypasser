$.register({
  rule: {
    host: /^link\.animagz\.org$/,
  },
  ready: function () {
    'use strict';

    var a = $('.redirect');
    a = a.href.match(/\?r=(.+)$/);
    a = atob(a[1]);
    $.openLink(a);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
