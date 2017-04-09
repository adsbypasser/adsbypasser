$.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/,
    path: /^\/go\/\w+$/,
  },
  ready: function (m) {
    'use strict';

    var a = $('#btn-main');
    $.openLink(a.href);
  },
});
