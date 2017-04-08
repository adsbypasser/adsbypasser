$.register({
  rule: {
    host: /^www\.pornimagex\.com$/,
    path: /^\/image\/.*$/,
  },
  ready: function () {
    'use strict';

    var img = $('#fixed img.border2px');
    $.openImage(img.src);
  },
});
