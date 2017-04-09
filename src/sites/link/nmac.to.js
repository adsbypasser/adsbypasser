$.register({
  rule: {
    host: /^nmac\.to$/,
    path: /^\/download\/(.+)/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.path[1]);
    $.openLink(url);
  },
});
