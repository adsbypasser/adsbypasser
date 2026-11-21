/**
 * @domain imx.to
 */
_.register({
  rule: {
    host: /^imx\.to$/,
  },
  async ready() {
    let a = $.$(".btn");
    if (a) {
      a.click();
    }
    a = $(".img-photo");
    await $.openLink(a.href);
  },
});
