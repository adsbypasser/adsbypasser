$.register({
  rule: {
    host: [
      /^www\.linkdecode\.com$/,
      /^www\.fastdecode\.com$/,
    ],
    path: /^\/$/,
    query: /^\?.+$/,
  },
  ready: function (m) {
    'use strict';

    $.removeNodes('iframe');

    var b = $('#m > .Visit_Link');
    b = b.onclick.toString().match(/\'([^']+)\'/);
    if (!b) {
      throw new _.AdsBypasser('pattern changed');
    }
    $.openLink(b[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
