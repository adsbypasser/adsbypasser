$.register({
  rule: {
    host: /^looy\.in$/,
    path: /^\/Pro\/(.+)$/,
  },
  ready: function (m) {
    'use strict';
    $.post('http://looy.in/Go/Index/ProSkipAd', {
      code: m.path[1],
      server: '',
    }).then(function (url) {
      $.openLink(url);
    }).catch(function (e) {
      _.warn(e);
    });
  },
});
$.register({
  rule: {
    host: /^looy\.in$/,
    path: /^\/(.+)$/,
  },
  start: function (m) {
    'use strict';
    $.openLink('/Pro/' + m.path[1]);
  },
});

// ex: ts=2 sts=2 sw=2 et
// sublime: tab_size 2; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
// kate: space-indent on; indent-width 2;
