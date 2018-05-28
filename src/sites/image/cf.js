_.register({
  rule: {
    host: [
      /^www\.x45x\.info$/,
      /^imadul\.com$/,
    ],
    query: /\?p[mt]=(.+)/,
  },
  async start (m) {
    await $.openImage('/?di=' + m.query[1]);
  },
});
