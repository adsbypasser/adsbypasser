/**
 * @domain imx.to
 */
_.register({
  rule: {
    host: /^imx\.to$/,
  },
  async ready() {
    let a = $.$("#continuebutton, .button");
    if (a) {
      a.click();
    }
    a = $(".centred");
    await $.openImage(a.src);
  },
});
