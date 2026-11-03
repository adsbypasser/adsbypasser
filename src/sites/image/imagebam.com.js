/**
 * @domain imagebam.com
 */
_.register({
  rule: {
    host: /^imagebam\.com$/,
  },
  async ready() {
    let a = $.$("#continue > a");
    if (a) {
      a.click();
    }
    a = $(".main-image");
    await $.openImage(a.src);
  },
});
