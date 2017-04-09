$.register({
  rule: {
    host: /^fastpic\.ru$/,
    path: /^\/view\//,
  },
  ready: function () {
    'use strict';

    var img = $('#picContainer #image');
    $.openImage(img.src, {
      // prevent loopback if image not found
      referer: true,
    });
  },
});
