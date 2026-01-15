/**
 * @domain imgpv.com
 */
_.register({
  rule: {
    host: /^imgpv\.com$/,
  },
  async ready() {
    const b = $("div > button");
    b.click();
  },
});
