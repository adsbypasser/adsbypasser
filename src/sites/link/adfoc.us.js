_.register({
  rule: {
    host: /^adfoc\.us$/,
  },
  async ready () {
    const a = $('.skip');
    await $.openLink(a.href);
  },
});
