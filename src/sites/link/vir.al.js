$.register({
  rule: {
    host: /^(www\.)?vir\.al$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/var target_url = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    $.openLink(m[1]);
  },
});
