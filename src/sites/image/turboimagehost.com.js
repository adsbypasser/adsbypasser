$.register({
  rule: {
    host: /^www\.turboimagehost\.com$/,
    path: /^\/p\//,
  },
  ready: function () {
    'use strict';

    var i = $('#imageid');
    $.openImage(i.src);
  },
});
