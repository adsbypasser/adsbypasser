_.register({
  rule: {
    host: [
      /^imgnova\.xyz$/,
      /^www\.hentai-hot\.xyz$/,
      /^www\.hentai-king\.online$/,
    ],
    path: /^\/i\/.+\.php$/,
    query: /f=(.+)$/,
  },
  async start (m) {
    await $.openImage('f/' + m.query[1]);
  },
});
