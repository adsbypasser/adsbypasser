$.register({
  rule: {
    host: /^(www\.)?linkdrop\.net$/,
  },
  ready: function () {
    'use strict';

    $.removeNodes('iframe');

    var matches = $.searchScripts(/\$\("a\.redirect"\)\.attr\("href","([^"]+)"\)\.text/);
    // Most likely not on a shortening page
    if (!matches) {
      return;
    }

    var l = matches[1];
    $.openLink(l);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
