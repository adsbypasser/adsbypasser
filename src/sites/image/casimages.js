$.register({
  rule: 'http://www.casimages.com/img.php?*',
  ready: function () {
    'use strict';

    var img = $('td a img');
    $.openImage(img.src);
  },
});
