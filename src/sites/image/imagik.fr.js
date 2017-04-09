$.register({
  rule: {
    host: /^imagik\.fr$/,
    path: /^\/view(-rl)?\/(.+)/,
  },
  start: function (m) {
    'use strict';

    // mimetype is text/plain
    $.openImage('/uploads/' + m.path[2]);
  },
});
