$.register({
  rule: {
    host: /^(www\.)?shorturl\.rapeit\.net$/,
    path: /^\/go\/[a-f0-9]+$/,
  },
  ready: function (m) {
    'use strict';

    var a = $('a#download_link');
    $.openLink(a.href);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
