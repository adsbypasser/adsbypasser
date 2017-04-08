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
