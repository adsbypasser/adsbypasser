$.register({
  rule: {
    host: /^(www\.)?sa\.ae$/,
    path: /^\/\w+\/$/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/var real_link = '([^']+)';/);
    $.openLink(m[1]);
  },
});
