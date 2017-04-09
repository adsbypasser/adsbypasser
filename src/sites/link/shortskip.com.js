$.register({
  rule: {
    host: /^www\.shortskip\.com$/,
    path: /^\/short\.php$/,
    query: /i=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    var url = decodeURIComponent(m.query[1]);
    $.openLink(url);
  },
});
