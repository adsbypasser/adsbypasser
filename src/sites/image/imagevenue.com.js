/**
 * @domain imagevenue.com
 */
_.register({
  rule: {
    host: /^www\.imagevenue\.com$/,
  },
  async ready() {
    const i = $("#main-image");
    await $.openImage(i.src);
  },
});
