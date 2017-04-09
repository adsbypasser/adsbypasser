$.register({
  rule: {
    host: /^p\.pw$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var m = $.searchScripts(/window\.location = "(.*)";/);
    m = m[1];
    $.openLink(m);
  },
});
