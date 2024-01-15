_.register({
  rule: {
    host: /^ctr\.sh$/,
  },
  async ready () {
    await _.wait(12000);
    const b = $('.btn.btn-primary.btn-captcha');
    b.click();
  },
});
