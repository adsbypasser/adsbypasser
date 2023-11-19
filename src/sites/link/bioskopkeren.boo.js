_.register({
  rule: {
    host: /^bioskopkeren\.boo$/,
  },
  async ready () {
    await _.wait(1000);
    const c = $('.reklamgec');
    c.click();
  },
});
