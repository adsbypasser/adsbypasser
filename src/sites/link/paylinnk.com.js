_.register({
  rule: {
    host: /^paylinnk\.com$/,
  },
  async ready () {
    await _.wait(2000);
    const a = $('div.banner.banner-captcha');
    a.click();
    const b = $('.btn.btn-success.btn-lg.get-link');
    b.click();
  },
});
