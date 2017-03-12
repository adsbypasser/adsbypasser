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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
