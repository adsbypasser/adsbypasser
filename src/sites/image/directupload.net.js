$.register({
  rule: 'http://*.directupload.net/file/*.htm',
  ready: function () {
    'use strict';

    var i = $('#ImgFrame');
    $.openImage(i.src);
  },
});
