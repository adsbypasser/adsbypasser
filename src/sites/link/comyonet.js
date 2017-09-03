_.register({
  rule: {
    host: /^comyonet\.com$/,
  },
  async ready () {
    const input = $('input[name="enter"]');
    input.click();
  },
});
