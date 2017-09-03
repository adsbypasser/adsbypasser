_.register({
  rule: {
    host: /^streamingfrench\.net$/,
    path: /^\/$/,
    query: /^\?xb=(.+)$/,
  },
  async start (m) {
    const url = decodeURIComponent(m.query[1]);
    await $.openLink(url);
  },
});
