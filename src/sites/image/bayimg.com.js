/**
 * @domain bayimg.com
 */
_.register({
  rule: {
    host: /^bayimg\.com$/,
  },
  async ready() {
    const i = $("#mainImage");
    await $.openImage(i.src);
  },
});
