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
