$.register({
  rule: {
    host: /^igg-games\.com?$/,
    query: /\?xurl=([^?]*)$/,
  },
  start: function (m) {
    'use strict';

    var url = 'http' + decodeURIComponent(m.query[1]);
    $.openLink(url);
  },
});
