/**
 * @domain cuttty.com
 */
_.register({
  rule: {
    host: /^cuttty\.com$/,
  },
  async ready() {
    await _.wait(9000);
    const b = $("#submit-button");
    b.click();
  },
});
