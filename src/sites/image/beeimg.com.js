$.register({
  rule: {
    host: /^beeimg\.com$/,
    path: /\/view\/.*/,
  },
  ready: function () {
    'use strict';

    var img = $('img.img-responsive');
    $.openImage(img.src);
  },
});
