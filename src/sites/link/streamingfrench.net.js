$.register({
  rule: {
    host: /^streamingfrench\.net$/,
    path: /^\/$/,
    query: /^\?xb=(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = decodeURIComponent(m.query[1]);
    $.openLink(url);
  },
});
