$.register({
  rule: {
    host: /^leechpremium\.space$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var a = $('#btn-main');
    var i = a.href.lastIndexOf('http');
    a = a.href.substr(i);
    $.openLink(a);
  },
});
