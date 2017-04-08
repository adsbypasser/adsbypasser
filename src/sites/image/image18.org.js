// I don't think these sites are same
$.register({
  rule: [
    'http://image18.org/show/*',
    'http://screenlist.ru/details.php?image_id=*',
    'http://www.imagenetz.de/*/*.html',
  ],
  ready: function () {
    'use strict';

    var img = $('#picture');
    $.openImage(img.src);
  },
});
