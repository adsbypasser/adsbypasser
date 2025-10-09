/**
 * @domain imgdawgknuttz.com
 * @domain xxxwebdlxxx.org
 * @domain xxxwebdlxxx.top
 */
_.register({
  rule: {
    host: [
      /^imgdawgknuttz\.com$/,
      /^xxxwebdlxxx\.(org|top)$/,
    ],
  },
  async ready() {
    const a = $(".centred, .centred_resized");
    await $.openImage(a.src);
  },
});
