$.register({
  rule: {
    host: /^imglocker\.com$/,
    path: /^(\/\w+)\/(\w+\.\w+)$/,
  },
  start: function (m) {
    'use strict';
    var url = _.T('//img.imglocker.com{0}_{1}');
    $.openImage(url(m.path[1], m.path[2]));
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
