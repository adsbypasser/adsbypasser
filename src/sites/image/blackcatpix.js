$.register({
  rule: 'http://blackcatpix.com/v.php?*',
  ready: function () {
    'use strict';

    var img = $('td center img');
    $.openImage(img.src);
  },
});
