$.register({
  rule: {
    host: /^imgbox\.com$/,
    path: /^\/[\d\w]+$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var i = $('#img');
    $.openImage(i.src);
  },
});
