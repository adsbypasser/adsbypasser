_.register({
  rule: {
    host: /^dl\.layarkaca21\.vip$/,
    path: /^\/iframe\//,
  },
  async ready () {
    const lv = $('.content #skip a');
    await $.openLink(lv.href);
  },
});

_.register({
  rule: {
    host: /^dl\.layarkaca21\.vip$/,
    path: /^\/(.+)\//,
  },
  async start (m) {
    await $.openLink('/iframe/top.php?slug=' + m.path[1]);
  },
});
