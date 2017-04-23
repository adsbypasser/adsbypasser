$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/fly\/site\.php$/,
    query: /^\?to=(.+)$/,
  },
  ready: function () {
    'use strict';

    var a = $('.skip > .btn');
    $.openLink(a.href);
  },
});

$.register({
  rule: {
    host: /^link\.tl$/,
    path: /[^^](https?:\/\/.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.path[1]);
  },
});

$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink('/fly/site.php?to=' + m.path[1]);
  },
});
