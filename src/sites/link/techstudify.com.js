_.register({
  rule: {
    host: /^techstudify\.com$/,
    path: /^\/elon.php/,
    query: /link=([^&]+)/,
  },
  async start(m) {
    await $.openLink("https://rplinks.in/" + m.query[1]);
  },
});
