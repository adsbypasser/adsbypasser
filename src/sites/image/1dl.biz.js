$.register({
  rule: [
    {
      host: /^1(dl|be)\.biz$/,
      path: /^\/\w\.php$/,
      query: /^\?\w\/\d+$/,
    },
    {
      host: /^img\.1dl\.biz$/,
      path: /^\/\w\.php$/,
      query: /^\?\w\/([\d\/]+)$/,
    },
  ],
  ready: function () {
    'use strict';

    var a = $('.main a, .main-l a');
    $.openImage(a.href, {
      referer: true,
    });
  },
});
