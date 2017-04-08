$.register({
  rule: {
    host: /^x\.pixfarm\.net$/,
    path: /^\/sexy\/\d+\/\d+\/.+\.html$/,
  },
  ready: function () {
    'use strict';

    var i = $('img');
    $.openImage(i.src);
  },
});
