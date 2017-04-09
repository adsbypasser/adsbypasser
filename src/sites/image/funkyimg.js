$.register({
  rule: [
    'http://funkyimg.com/viewer.php?img=*',
    'http://funkyimg.com/view/*',
  ],
  ready: function () {
    'use strict';

    var i = $('#viewer img');
    $.openImage(i.src);
  },
});
