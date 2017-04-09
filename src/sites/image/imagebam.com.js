$.register({
  rule: 'http://www.imagebam.com/image/*',
  ready: function () {
    'use strict';

    var o = $('.image-container img[id]');
    // somehow the server send image as an attachment
    // so I replace whole document.body with single img
    $.openImage(o.src, {
      replace: true,
    });
  },
});
