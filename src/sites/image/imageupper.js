$.register({
  rule: 'http://imageupper.com/i/?*',
  ready: function () {
    'use strict';

    var i = $('#img');
    $.openImage(i.src);
  },
});
