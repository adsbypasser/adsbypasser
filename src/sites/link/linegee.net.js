/**
 * @domain linegee.net
 */
_.register({
  rule: {
    host: /^linegee\.net$/,
  },
  async ready() {
    const b = $("p.kecil a");
    b.click();
  },
});
