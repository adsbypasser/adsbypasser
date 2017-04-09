$.register({
  rule: 'http://www.fotolink.su/v.php?id=*',
  ready: function () {
    'use strict';

    var i = $('#content img');
    $.openImage(i.src);
  },
});
