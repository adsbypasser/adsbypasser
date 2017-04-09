// I don't think these sites are the same
$.register({
  rule: [
    'http://*.imagevenue.com/img.php?*',
    'http://hotchyx.com/d/adult-image-hosting-view-08.php?id=*',
    'http://www.hostingfailov.com/photo/*',
  ],
  ready: function () {
    'use strict';

    var i = $('#thepic');
    $.openImage(i.src);
  },
});
