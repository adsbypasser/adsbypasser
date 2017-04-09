$.register({
  rule: {
    host: [
      /^(www\.)?allkeyshop\.com$/,
      /^cshort\.org$/,
    ],
  },
  ready: function (m) {
    'use strict';

    var matches = $.searchScripts(/window\.location\.href = "([^"]+)"/);
    matches = matches[1];
    $.nuke(matches);
    $.openLink(matches);
  },
});
