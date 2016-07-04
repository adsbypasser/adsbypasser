$.register({
  rule: {
    host: /^sht\.io$/,
    path: /^\/\d+\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    var url = atob(m.path[1]);
    // the salt is like: XXX{sht-io}url{sht-io}{sht-io}standard
    url = url.match(/\{sht-io\}(.+)\{sht-io\}.*\{sht-io\}/);
    $.openLink(url[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
