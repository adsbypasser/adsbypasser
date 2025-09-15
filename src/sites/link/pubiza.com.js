/**
 * @domain icerik.site
 */
_.register({
  rule: {
    host: /^icerik\.site$/,
    path: /^\/go/,
  },
  async ready() {
    await _.wait(500);
    const button = $("#get_link_btn");
    button.click();
  },
});
