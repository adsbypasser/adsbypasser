$.register({
  rule: {
    host: /^prntscr\.com$/
  },
  ready: function () {
    'use strict';

    var i = $('#screenshot-image');
    $.openImage(i.src);
  },
});
