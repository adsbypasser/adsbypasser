$.register({
  rule: {
    host: /^www\.anafile\.com$/,
  },
  ready: function () {
    'use strict';

    var b = $.$('#btn_download');
    if (b) {
      // second stage
      b.disabled = false;
      $.removeNodes('div[align=center]');
      return;
    }

    // first stage
    b = $('#plans_free form [type=submit]');
    b.click();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
