$.register({
  rule: 'http://www.pic-upload.de/view-*.html',
  ready: function () {
    'use strict';

    $.removeNodes('.advert');
    var i = $('img.preview_picture_2b, img.original_picture_2b');
    $.openImage(i.src);
  },
});
