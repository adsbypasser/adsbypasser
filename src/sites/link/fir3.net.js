_.register({
  rule: {
    host:/^fir3\.net$/,
  },
  async ready () {
    await _.wait(12000);
    const b = $('.btn.btn-success.btn-lg.get-link');
    b.click();
  },
});
