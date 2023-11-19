_.register({
  rule: {
    host: /^gplinks\.co$/,
  },
  async ready () {
    await _.wait(8000);
    const d = $('.get-link');
    d.click();
  },
});
