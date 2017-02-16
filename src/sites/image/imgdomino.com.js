$.register({
  rule: 'http://imgdomino.com/image/*',
  ready: function () {
    'use strict';

    var i = $('#full_image');
    $.openImage(i.src);
  },
});