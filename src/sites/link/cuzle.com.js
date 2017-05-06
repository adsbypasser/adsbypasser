$.register({
  rule: {
    host: [
      /^shorten\.id$/,
    ],
    path: /^\/$/,
    query: /^\?(.+)=$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.query[1]);
    $.openLink(url);
  },
});
