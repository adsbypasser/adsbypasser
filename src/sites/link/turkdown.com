$.register({
  rule: {
    host: /^dream\.turkdown\.com$/,
    path: /^\/link/,
    query: /^\?id=(.+)/,
  },
  ready: function (m) {
    'use strict';
    $.get('?ajax='+m.query[1]).then(function (html) {
      html = _.parseJSON(html);
      $.openLink(html.url);
    })
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
