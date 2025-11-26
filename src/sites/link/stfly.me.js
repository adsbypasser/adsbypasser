/**
 * @domain stfly.me
 * @domain stfly.xyz
 */
_.register({
  rule: {
    host: /^stfly\.(me|xyz)$/,
  },
  async ready() {
    const b = $(".btn-captcha.m-2.form-send");
    b.click();
  },
});
