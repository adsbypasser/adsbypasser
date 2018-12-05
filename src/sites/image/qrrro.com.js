_.register({
  rule: {
    host: /^qrrro\.com$/,
    path: /^(\/images\/.+)\.html$/,
  },
  async start (m) {
    await $.openImage(m.path[1]);
  },
});
