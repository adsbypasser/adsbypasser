$.register({
  rule: {
    host: /^img(dino|tiger|zap)\.com$/,
    path: /^\/viewer\.php$/,
    query: /^\?file=/,
  },
  ready: function () {
    'use strict';

    var o = $('#cursor_lupa');
    $.openImage(o.src);
  },
});
