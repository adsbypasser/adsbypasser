$.register({
  rule: 'http://www.imagebam.com/image/*',
  ready: function () {
    'use strict';

    var o = $('.image-container img[id]');
    // somehow the server send image as an attachment
    // so I replace whole document.body with single img
    $.replace(o.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
