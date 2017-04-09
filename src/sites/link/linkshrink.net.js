$.register({
  rule: {
    host: /^linkshrink\.net$/,
    path: /^\/[a-zA-Z0-9]+$/,
  },
  start: function () {
    'use strict';

    $.window._impspcabe = 0;
  },
  ready: function () {
    'use strict';

    var l = $('#skip .bt');
    $.openLink(l.href);
  },
});

$.register({
  rule: {
    host: /^linkshrink\.net$/,
    path: /=(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.path[1]);
  },
});
