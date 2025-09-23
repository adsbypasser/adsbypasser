/**
 * @domain stfly.me
 * @domain stfly.xyz
 * @domain techtrendmakers.com
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

_.register({
  rule: {
    host: /^techtrendmakers\.com$/,
  },
  async ready() {
    const b = $(".btn-captcha.m-2.form-send.step_btn");
    await _.wait(6000);
    b.click();
  },
});
