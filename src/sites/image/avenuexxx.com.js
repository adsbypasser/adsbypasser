$.register({
  rule: {
    host: /^avenuexxx\.com$/,
  },
  ready: function () {
    'use strict';

    var i = $('#content img');
    $.openImage(i.src);
  },
});
