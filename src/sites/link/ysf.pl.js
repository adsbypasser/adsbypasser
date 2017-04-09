$.register({
  rule: {
    host: /^ysf\.pl$/,
    path: /^\/3\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.path[1]);
    $.openLink(url);
  },
});

$.register({
  rule: {
    host: /^ysf\.pl$/,
    path: /^\/2\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = m.path[1].match(/.{2}/g).map(function (h) {
      return String.fromCharCode(parseInt(h, 16));
    }).join('');

    $.openLink(url);
  },
});
