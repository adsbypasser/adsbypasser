$.register({
  rule: {
    host: /^coin-ads\.com$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';

    var s = $.$$('script').find(function (n) {
      var m = n.innerHTML.match(/window\.location\.replace/);
      if (!m) {
        return _.nop;
      }
    });
    if (s) {
      // second stage
      return;
    }

    var f = $.$$('script').find(function (n) {
      var m = n.innerHTML.match(/countdownArea\.innerHTML = "([^"]+)"/);
      if (m) {
        return m[1];
      }
      return _.nop;
    });
    if (!f) {
      _.warn('pattern changed');
      return;
    }

    var d = $('#area');
    d.innerHTML = f.payload;
    // NOTE should not use submit, must click input
    d = $('.skip', d);
    d.click();
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
