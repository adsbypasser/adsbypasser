$.register({
  rule: {
    host: /^(www\.)?similarsites\.com$/,
    path: /^\/goto\/([^?]+)/
  },
  start: function (m) {
    'use strict';

    var l = m.path[1];
    if (!/^https?:\/\//.test(l)) {
      l = 'http://' + l;
    }

    $.openLink(l);
  },
});
