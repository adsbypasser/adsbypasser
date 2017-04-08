$.register({
  rule: {
    host: /^goto\.loncat\.in$/,
    query: /open=(.+)/,
  },
  start: function (m) {
    'use strict';

    var url = atob(atob(m.query[1]));
    $.openLink(url);
  },
});
