$.register({
  rule: {
    host: /^1pics\.ru$/,
  },
  ready: function () {
    'use strict';

    var img = $('img[alt$="1Pics.Ru"]');
    $.openImage(img.src);
  },
});
