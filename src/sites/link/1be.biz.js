_.register({
  rule: {
    host: /^(www\.)?1be\.biz$/,
    path: /^\/s\.php$/,
    query: /^\?(.+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});
