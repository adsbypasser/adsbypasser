$.register({
  rule: {
    host: /^imgah\.com$/,
  },
  ready: function () {
    'use strict';

    // first stage
    var o = $.$('input[type=submit]');
    if (o) {
      o.click();
      return;
    }

    // second stage
    o = $('img.pic');
    $.replace(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
