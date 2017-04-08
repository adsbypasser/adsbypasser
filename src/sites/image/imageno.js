$.register({
  rule: 'http://imageno.com/*.html',
  ready: function () {
    'use strict';

    var i = $('#image_div img');
    $.openImage(i.src);
  },
});
