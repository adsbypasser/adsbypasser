_.register({
  rule: {
    host: /^(www\.)?(1be|1dl)\.biz$/,
    path: /^\/z\.php$/,
    query: /^\?(.+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});

_.register({
  rule: {
    host: /^1(be|dl)\.biz$/,
    path: /^\/[jt]\.php$/,
    query: /^\?s=/,
  },
  async ready () {
    const a = $('.j-link');
    await $.openLink(a.href);
  },
});
