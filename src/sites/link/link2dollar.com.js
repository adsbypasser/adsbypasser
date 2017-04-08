$.register({
  rule: {
    host: /\.link2dollar\.com$/,
    path: /^\/\d+$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/var rlink = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    m = m[1];

    $.openLink(m);
  },
});
