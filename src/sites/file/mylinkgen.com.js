$.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/p\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink('/g/' + m.path[1]);
  },
});

$.register({
  rule: {
    host: /^mylinkgen\.com$/,
    path: /^\/g\//,
  },
  ready: function () {
    'use strict';

    var a = $('#main-content a.btn.btn-default');
    $.openLink(a.href);
  },
});
