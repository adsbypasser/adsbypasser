$.register({
  rule: {
    host: /^(www\.)?empireload\.com$/,
    path: /^(\/images(\/files\/\w)?)\/.\.php$/,
    query: /^\?link=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openImage(m.path[1] + '/link/' + m.query[1]);
  },
});
