$.register({
  rule: {
    host: /^www\.sexyimg\.com$/,
    path: /^\/s\/.*\.html$/,
  },
  ready: function () {
    'use strict';

    var f = $('#imgbox form');
    $.openLink(f.action);
  },
});

$.register({
  rule: {
    host: /^www\.sexyimg\.com$/,
    path: /^\/b\/.*\.html$/,
  },
  ready: function () {
    'use strict';

    var i = $('#imgbox img.bigimg');
    $.replace(i.src);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
