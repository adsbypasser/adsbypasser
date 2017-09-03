_.register({
  rule: {
    host: /^topload\.pro$/,
  },
  async ready () {
    const a = $('.hide a.btn');
    await $.openLink(a.href);
  },
});
