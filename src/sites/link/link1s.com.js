_.register({
  rule: {
    host: /^link1s\.com$/,
  },
  async ready () {
    await _.wait(10000);
    const b = $('.btn.btn-success.btn-lg.get-link');
    b.click();
  },
});
