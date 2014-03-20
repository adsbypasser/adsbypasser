$.register({
  rule: 'http://my-link.pro/*',
  ready: function () {
    'use strict';

    // Find the iframe that is used to display the real link
    var i = $('iframe[scrolling=auto]');

    if (i) {
      $.openLink(i.src);
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
