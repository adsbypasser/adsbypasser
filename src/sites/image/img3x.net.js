$.register({
  rule: {
    host: /^img3x\.net$/,
  },
  ready: function () {
    'use strict';

    var f = $.$('form');
    if (f) {
      f.submit();
      return;
    }

    f = $('#show_image');
    $.openImage(f.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
