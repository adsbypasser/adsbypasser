// image
$.register({
  rule: {
    host: /^ichan\.org$/,
    path: /^\/image\.php$/,
    query: /path=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/' + m.query[1]);
  },
});

// board
$.register({
  rule: {
    host: /ichan\.org$/,
  },
  ready: function () {
    'use strict';

    $.$$('a').each(function (a) {
      if (a.href.indexOf('/url/http://') > -1) {
        a.href = a.href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/, '');
      }
    });
  },
});
