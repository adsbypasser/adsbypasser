/**
 * @domain imgspice.com
 */
_.register({
  rule: {
    host: /^imgspice\.com$/,
  },

  async ready() {
    const o = $("#imgpreview.pic");
    await $.openImage(o.src);
  },
});
