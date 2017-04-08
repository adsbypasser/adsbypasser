$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/fly\/go\.php$/,
  },
  ready: function () {
    'use strict';

    var a = $('.skip_btn2 a');
    $.openLink(a.href);
  },
});

$.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/(.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink('/fly/go.php?to=' + m.path[1]);
  },
});
