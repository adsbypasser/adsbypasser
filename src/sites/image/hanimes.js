$.register({
  rule: {
    host: /^www\.(h-animes|adultmove)\.info/,
    path: /^\/.+\/.+\/.+\.html$/,
  },
  ready: function () {
    'use strict';

    var a = $('.dlbutton2 > a');
    $.openImage(a.href);
  },
});
