_.register({
  rule: {
    host: /^www\.adz7short\.space$/,
  },
  async ready () {
    const b = $('#continue');
    await _.wait(10000);
    b.click();
  },
});
