$.register({
  rule: {
  	host: /^link2you\.ru$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = m.path[1];
    if (!url.match(/^https?:\/\//)) {
      url = '//' + url;
    }
    $.openLink(url);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
