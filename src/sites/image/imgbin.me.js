_.register({
  rule: {
    host: /^imgbin\.me$/,
    path: /^\/view\/([A-Z]+)$/,
  },
  async start (m) {
    // always jpg
    const tpl = _.template('/image/{0}.jpg');
    await $.openImage(tpl(m.path[1]));
  },
});
