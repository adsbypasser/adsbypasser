$.register({
  rule: {
    host: /turkdown\.com$/,
    path: /^\/link/,
    query: /^\?id=(.+)/,
  },
  ready: function (m) {
    'use strict';
    $.get('?ajax='+m.query[1]).then(function (html) {
      html = _.parseJSON(html);
      var patt = new RegExp("stepone\=(.+)");
      var res = patt.exec(html.url);
      $.openLink(atob(res[1]));
    })
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
