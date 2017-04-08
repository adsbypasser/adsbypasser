$.register({
  rule: {
    host: /^(www\.)?freeimgup\.com$/,
    path: /^\/xxx\//,
  },
  ready: function () {
    'use strict';

    var img = $('#mainimage');
    $.openImage(img.src);
  },
});
