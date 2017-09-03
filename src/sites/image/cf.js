_.register({
  rule: {
    host: [
      /^www\.x45x\.info$/,
      /^(imadul|mypixxx\.lonestarnaughtygirls)\.com$/,
      /^ghanaimages\.co$/,
      /^imgurban\.info$/,
      /^d69\.in$/,
    ],
    query: /\?p[mt]=(.+)/,
  },
  async start (m) {
    await $.openImage('/?di=' + m.query[1]);
  },
});
