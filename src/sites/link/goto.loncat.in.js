_.register({
  rule: {
    host: /^goto\.loncat\.in$/,
    query: /open=(.+)/,
  },
  async start (m) {
    const url = atob(atob(m.query[1]));
    await $.openLink(url);
  },
});
