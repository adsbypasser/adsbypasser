$.register({
  rule: {
    host: /^(qrrro|greenpiccs)\.com$/,
    path: /^(\/images\/.+)\.html$/,
  },
  start: function (m) {
    'use strict';

    $.openImage(m.path[1]);
  },
});
