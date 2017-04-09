_.register({
  rule: {
    host: /^tinyarrows\.com$/,
    path: /^\/preview\.php$/,
    query: /^\?page=([^&]+)/,
  },
  async start (m) {
    await $.openLink(decodeURIComponent(m.query[1]));
  },
});
