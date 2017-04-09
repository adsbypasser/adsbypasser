_.register({
  rule: {
    host: /^www\.lolinez\.com$/,
    query: /\?(.+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});
