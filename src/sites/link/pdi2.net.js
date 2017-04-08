$.register({
  rule: {
    host: /^pdi2\.net$/,
  },
  ready: function () {
    'use strict';

    var s = $.searchScripts(/top\.location = '([^']+)'/);
    s = s[1];
    $.openLink(s);
  },
});
