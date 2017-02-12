$.register({
  rule: {
    host: /^radikal\.ru$/,
    path: /^\/big\//,
  },
  ready: function () {
    'use strict';

    var i = $.$('.base-page_center > div:nth-child(2) > img:nth-child(1)');
    $.openImage(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
