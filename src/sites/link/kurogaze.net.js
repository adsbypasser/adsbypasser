$.register({
  rule: {
    host: /^st\.kurogaze\.net$/,
    query: /r=(.+)/,
  },
  start: function (m) {
    'use strict';

    var r = atob(m.query[1]);
    $.openLink(r);
  },
});

$.register({
  rule: {
    host: /^st\.kurogaze\.net$/,
  },
  ready: function () {
    'use strict';

    var a = $('a.redirect');
    $.openLink(a.href);
  },
});
