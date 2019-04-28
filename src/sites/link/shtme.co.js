_.register({
  rule: {
    host: /^shtme\.co$/,
    path: /^\/\w+/,
  },
  async ready () {
    const s = $('.content div a button');
    s.click();
  },
});
