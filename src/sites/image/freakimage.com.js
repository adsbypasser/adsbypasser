$.register({
  rule: {
    host: [
      /^freakimage\.com$/,
      /^www\.hostpic\.org$/,
    ],
    path: /^\/view\.php$/,
    query: /^\?filename=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/images/' + m.query[1]);
  },
});
