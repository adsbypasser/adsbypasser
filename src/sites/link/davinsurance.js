_.register({
  rule: {
    host: /^davinsurance\.com$/,
    query: /r=(.+)/,
  },
  async start (m) {
    const e = atob(m.query[1]);
    await $.openLink(e);
  },
});
