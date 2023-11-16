_.register({
  rule: {
    host: /^xpshort\.com$/,
  },
  async ready () {
    await _.wait(8000);
    const a = $('.btn.btn-success.btn-lg.get-link');
    a.click();
  },
});
