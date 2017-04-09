$.register({
  rule: {
    host: /^clk\.im$/,
  },
  ready: function (m) {
    'use strict';

    $.removeNodes('iframe');

    var matches = $.searchScripts(/\$\("\.countdown"\)\.attr\("href","([^"]+)"\)/);
    $.openLink(matches[1]);
  },
});
