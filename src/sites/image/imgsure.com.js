$.register({
  rule: {
    host: /^(imgsure|picexposed)\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $('img.pic');
    $.openImage(i.src);
  },
});
