$.register({
  rule: {
    host: /^itw\.me$/,
    path: /^\/r\//,
  },
  ready: function () {
    'use strict';

    var f = $('.go-form');
    f.submit();
  },
});
