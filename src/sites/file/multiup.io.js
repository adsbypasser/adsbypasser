/**
 * @domain multiup.io
 */
_.register({
  rule: {
    host: /^multiup\.io$/,
  },
  async ready() {
    const b = $("#download-button");
    b.click();
  },
});
