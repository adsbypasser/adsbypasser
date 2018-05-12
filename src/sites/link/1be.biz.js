_.register({
  rule: {
    host: /^(www\.)?1(be|dl)\.biz$/,
    path: /^\/z\.php$/,
    query: /^\?(.+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});
