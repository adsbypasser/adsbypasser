/**
 * @domain cuty.io
 */
_.register({
  rule: {
    host: /^cuty\.io$/,
  },
  async ready() {
    await _.wait(9000);
    const b = $("#submit-button");
    b.click();
  },
});
