$.register({
  rule: {
    host: /^urlinn\.com$/,
  },
  ready: function () {
    'use strict';

    var m = $('META[HTTP-EQUIV=refresh]').getAttribute('CONTENT').match(/url='([^']+)'/);

    if (m) {
      $.openLink(m[1]);
    }
  },
});
