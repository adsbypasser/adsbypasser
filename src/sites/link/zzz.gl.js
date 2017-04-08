$.register({
  rule: {
    host: /^zzz\.gl$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/var domainurl = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }

    $.openLink(m[1]);
  },
});
