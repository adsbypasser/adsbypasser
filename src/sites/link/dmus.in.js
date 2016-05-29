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

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
