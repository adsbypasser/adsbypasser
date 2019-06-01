_.register({
  rule: {
    host: /^crockolinks\.com$/,
  },
  async ready () {
    const c = $('.head > div:nth-child(3) > .skip');
    c.click();
  },
});
