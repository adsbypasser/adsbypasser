$.register({
  rule: {
    host: /^www\.lolinez\.com$/,
    query: /\?(.+)/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.query[1]);
  },
});
