$.register({
  rule: {
    host: /^(www\.)?3ra\.be$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var f = $.window.fc;
    if (!f) {
      throw new _.AdsBypasserError('window.fc is undefined');
    }
    f = f.toString();
    f = f.match(/href="([^"]*)/);
    if (!f) {
      throw new _.AdsBypasserError('url pattern outdated');
    }
    $.openLink(f[1]);
  },
});
