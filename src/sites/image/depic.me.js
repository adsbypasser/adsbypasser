/**
 * @domain depic.me
 * @domain dpic.me
 */
_.register({
  rule: {
    host: /^(depic|dpic)\.me$/,
  },
  async ready() {
    const i = $("#pic");
    await $.openImage(i.src);
  },
});
