$.register({
  rule: {
    host: /^img24\.org$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('img.img-polaroid + form');
    if (f) {
      f.submit();
      return;
    }

    f = $('img.img-polaroid');
    $.openImage(f.src, {
      referer: true,
    });
  },
});
