$.register({
  rule: 'http://imagearn.com/image.php?id=*',
  ready: function () {
    'use strict';

    var i = $('#img');
    $.openImage(i.src);
  },
});
