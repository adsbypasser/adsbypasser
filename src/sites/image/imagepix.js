$.register({
  rule: 'http://imagepix.org/image/*.html',
  ready: function () {
    'use strict';

    var i = $('img[border="0"]');
    $.openImage(i.src);
  },
});
