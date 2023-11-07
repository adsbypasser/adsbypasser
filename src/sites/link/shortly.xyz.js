_.register({
  rule: {
    host: /^www\.shortly\.xyz$/,
  },
  async ready () {
    await _.wait(8000);
    const a = $('.btn-success.btn-lg.get-link');
    a.click();
  },
});
