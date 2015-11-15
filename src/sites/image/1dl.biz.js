$.register({
  rule: [
    {
      host: /^1dl\.biz$/,
      path: /^\/(\w)\.php$/,
      query: /^\?([\d\/]+)$/,
    },
    {
      host: /^img\.1dl\.biz$/,
      path: /^\/(\w)\.php$/,
      query: /^\?\w\/([\d\/]+)$/,
    },
  ],
  ready: function () {
    'use strict';

    var a = $('.main-l a');
    $.openImage(a.href, {
      referer: true,
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
