$.register({
  rule: {
    host: /^(www\.)?(coin-ads\.com|shortin\.tk)$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';

    var m = $.searchScripts(/window\.location\.replace/);
    if (m) {
      // second stage
      return;
    }

    m = $.searchScripts(/countdownArea\.innerHTML = "([^"]+)"/);
    if (!m) {
      throw new _.AdsBypasserError('pattern changed');
    }
    m = m[1];

    var d = $.$('#area');
    if (d) {
      d.innerHTML = m;
      // NOTE should not use submit, must click input
      d = $('.skip', d);
      d.click();
      return;
    }

    // for iframe type
    d = $('#site');
    $.openLink(d.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
