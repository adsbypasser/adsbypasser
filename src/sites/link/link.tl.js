_.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/fly\/site\.php$/,
    query: /^\?to=(.+)$/,
  },
  async ready () {
    const a = $('.skip > .btn');
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: /^link\.tl$/,
    path: /[^^](https?:\/\/.+)$/,
  },
  start: function (m) {
    'use strict';

    $.openLink(m.path[1]);
  },
});

_.register({
  rule: {
    host: /^link\.tl$/,
    path: /^\/(.+)$/,
  },
  async start (m) {
    await $.openLink('/fly/site.php?to=' + m.path[1]);
  },
});
