_.register({
  rule: {
    host: /^linkpoi\.me$/,
  },
  async ready () {
    await _.wait(6000);
    const b = $('.btn.btn-primary.btn-block.redirect.get-link');
    b.click();
  },
});
