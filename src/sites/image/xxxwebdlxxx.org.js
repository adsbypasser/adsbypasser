/**
 * @domain xxxwebdlxxx.org
 * @domain xxxwebdlxxx.top
 */
_.register({
  rule: {
    host: /^xxxwebdlxxx\.(org|top)$/,
  },
  async ready() {
    const a = $(".centred, .centred_resized");
    await $.openImage(a.src);
  },
});
