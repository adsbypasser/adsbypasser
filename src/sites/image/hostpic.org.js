_.register({
  rule: {
    host: /^www\.hostpic\.org$/,
    path: /^\/view\.php$/,
    query: /^\?filename=([^&]+)/,
  },
  async start (m) {
    await $.openImage('/images/' + m.query[1]);
  },
});
