$.register({
  rule: {
    host: /^picstream\.tv$/,
    path: /^\/.*\/.*\.html$/,
  },
  ready: function () {
    'use strict';

    var img = $('#view1 > div:nth-child(1) > img:nth-child(1)');
    $.openImage(img.src);
  },
});
