$.register({
  rule: {
    host: /^indexmovie\.me$/,
    path: /^\/([^\/]+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink('/get/' + m.path[1]);
  },
});
