$.register({
  rule: {
    host: [
      /^imgnova\.xyz$/,
      /^www\.hentai-hot\.xyz$/,
      /^www\.hentai-king\.online$/,
    ],
    path: /^\/i\/.+\.php$/,
    query: /f=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage('f/' + m.query[1]);
  },
});
