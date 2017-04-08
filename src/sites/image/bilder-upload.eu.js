$.register({
  rule: 'http://www.bilder-upload.eu/show.php?file=*',
  ready: function () {
    'use strict';

    var i = $('input[type=image]');
    $.openImage(i.src);
  },
});
