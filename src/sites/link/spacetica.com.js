_.register({
  rule: {
    host: /^spacetica\.com$/,
  },
  async ready () {
    const b = $('center a');
    b.click();
  },
});