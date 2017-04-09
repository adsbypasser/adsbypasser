$.register({
  rule: {
    host: /^tinyarrows\.com$/,
    path: /^\/preview\.php$/,
    query: /^\?page=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openLink(decodeURIComponent(m.query[1]));
  },
});
