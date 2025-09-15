/**
 * @domain imageshack.com
 */
_.register({
  rule: {
    host: /^imageshack\.com$/,
    path: /^\/i\//,
  },
  async ready() {
    const i = $("#lp-image");
    await $.openImage(i.src);
  },
});
