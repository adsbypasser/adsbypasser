$.register({
  rule: {
    host: /^(www\.)?shink\.in$/,
    path: /^\/\w+$/,
  },
  ready: function () {
    'use strict';

    var f = $('#skip');
    // Specifying a correct #id input value seems unecessary
    f.submit();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
