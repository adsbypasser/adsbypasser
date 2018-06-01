_.register({
  rule: {
    host: /^imadul\.com$/,
    query: /\?p[mt]=(.+)/,
  },
  async start (m) {
    await $.openImage('/?di=' + m.query[1]);
  },
});
