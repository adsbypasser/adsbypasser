/**
 * @domain beeimg.com
 */
_.register({
  rule: {
    host: /^beeimg\.com$/,
  },
  async ready() {
    const img = $("#beeimage");
    await $.openImage(img.src);
  },
});
