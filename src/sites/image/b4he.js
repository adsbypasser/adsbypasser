$.register({
  rule: {
    host: [
      /^(b4he|fullimg)\.com/,
      /^fastpics\.net/,
      /^ifap\.co/,
    ],
    query: /^\?v=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/images/' + m.query[1]);
  },
});

$.register({
  rule: {
    host: /^imagep2p\.com$/,
    query: /^\?v=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/images/' + m.query[1] + '.jpeg');
  },
});
