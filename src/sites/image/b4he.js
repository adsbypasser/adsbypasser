$.register({
  rule: {
    host: /^(b4he|fullimg)\.com|fastpics\.net|ifap\.co$/,
    query: /^\?v=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/images/' + m.query[1]);
  },
});

$.register({
  rule: {
    host: /^imagep2p\.com$/,
    query: /^\?v=([^&]+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/images/' + m.query[1] + '.jpeg');
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
