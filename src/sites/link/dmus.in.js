$.register({
  rule: {
    host: /^dmus\.in$/,
    path: /[a-zA-Z0-9]+/,
  },
  ready: function () {
    'use strict';
    var i = $('a[class$=redirect]');
    $.openLink(i.href);
  },
});
