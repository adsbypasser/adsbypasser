_.register({
  rule: {
    host: /^thinfi\.com$/,
  },
  async ready () {
    const a = $('div p a');
    await $.openLink(a.href);
  },
});
