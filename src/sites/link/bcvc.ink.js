/**
 * @domain bcvc.ink
 */
_.register({
  rule: {
    host: /^bcvc\.ink$/,
  },
  async ready() {
    await _.wait(5000);
    const b = $("#getLink");
    b.click();
  },
});
