/**
 * @domain imagehaha.com
 */
_.register({
  rule: {
    host: /^imagehaha\.com$/,
    path: /\/*\/.*/,
  },
  async ready() {
    const img = $("img.img-responsive");
    await $.openImage(img.src);
  },
});
