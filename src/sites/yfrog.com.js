$.register({
  rule: {
    host: /\.yfrog\.com$/,
  },
  ready: function () {
    'use strict';

    if (/^\/z/.test(window.location.pathname)) {
      var i = $('#the-image img');
      $.openImage(i.src);
      return;
    }
    var a = $.$('#continue-link a, #main_image');
    if (a) {
      $.openLink('/z' + window.location.pathname);
      return;
    }
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
