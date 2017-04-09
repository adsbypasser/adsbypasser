_.register({
  rule: {
    host: /^indexmovie\.me$/,
    path: /^\/([^/]+)$/,
  },
  async start (m) {
    await $.openLink('/get/' + m.path[1]);
  },
});
