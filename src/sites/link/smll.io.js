$.register({
  rule: {
    host: /^smll\.io$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/window\.location="([^"]*)";/);
    $.openLink(m[1]);
  },
});
