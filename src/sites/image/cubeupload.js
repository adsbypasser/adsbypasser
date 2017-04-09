$.register({
  rule: 'http://cubeupload.com/im/*',
  ready: function () {
    'use strict';

    var img = $('img.galleryBigImg');
    $.openImage(img.src);
  },
});
