/**
 * @domain urlgalleries.net
 */
_.register({
  rule: {
    host: /^urlgalleries\.net$/,
  },
  async ready() {
    await _.wait(1000);
    const b = $("#overlay.butstyle");
    b.click();
  },
});
