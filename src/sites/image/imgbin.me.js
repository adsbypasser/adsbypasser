_.register({
  rule: {
    host: /^imgbin\.me$/,
    path: /^\/view\/([A-Z]+)$/,
  },
  async start (m) {
    // always jpg
    await $.openImage(`/image/${m.path[1]}.jpg`);
  },
});
