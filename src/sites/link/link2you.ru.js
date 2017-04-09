$.register({
  rule: {
    host: /^link2you\.ru$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = m.path[1];
    if (!url.match(/^https?:\/\//)) {
      url = '//' + url;
    }
    $.openLink(url);
  },
});
