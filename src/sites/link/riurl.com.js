$.register({
  rule: {
    host: /^riurl\.com$/,
    path: /^\/.+/,
  },
  ready: function () {
    'use strict';

    var s = $.$('body script');
    if (s) {
      s = s.innerHTML.indexOf('window.location.replace');
      if (s >= 0) {
        // let inline script redirect
        return;
      }
    }
    $.openLink('', {
      path: {
        hidden: '1',
        image: ' ',
      },
    });
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
