$.register({
  rule: 'http://vvcap.net/db/*.htp',
  ready: function () {
    'use strict';

    var i = $('img');
    $.openImage(i.src, {
      replace: true,
    });
  },
});
