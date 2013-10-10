$.register({
  rule: {
    host: /^goimagehost\.com$/,
    path: /^\/xxx\/(.+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/xxx/images/' + m.path[1]);
  },
});

$.register({
  rule: {
    host: /^goimagehost\.com$/,
    query: /^\?v=(.+)/,
  },
  start: function (m) {
    'use strict';

    $.openImage('/xxx/images/' + m.query[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
