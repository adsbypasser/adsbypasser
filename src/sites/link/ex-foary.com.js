/**
 * @domain forex-trnd.com
 */
_.register({
  rule: {
    host: /^forex-trnd\.com$/,
  },
  async ready() {
    await _.wait(10000);
    const a = $(".get-link");
    a.click();
  },
});
