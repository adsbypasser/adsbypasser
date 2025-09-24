/**
 * @domain linegee.net
 */
_.register({
  rule: {
    host: /^linegee\.net$/,
  },
  async ready() {
    await _.wait(3000);
    const b = $(".btn-xs");
    b.click();
  },
});
