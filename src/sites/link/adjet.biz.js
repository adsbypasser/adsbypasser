$.register({
  rule: {
    host: /^(www\.)?adjet\.biz$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/href=(\S+)/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    $.openLink(m[1]);
  },
});
