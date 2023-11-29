_.register({
  rule: {
    host: /^stfly\.me$/,
  },
  async ready () {
    const b = $('.btn-captcha.m-2.form-send');
    b.click();
  },
});

_.register({
  rule: {
    host: /^blogbux\.net$/,
  },
  async ready () {
    const b = $('.btn-captcha.m-2.form-send');
    await _.wait(12000);
    b.click();
  },
});

_.register({
  rule: {
    host: /^techtrendmakers\.com$/,
  },
  async ready () {
    const b = $('.btn-captcha.m-2.form-send.step_btn');
    await _.wait(6000);
    b.click();
  },
});
