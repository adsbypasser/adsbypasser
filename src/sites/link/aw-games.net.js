_.register({
  rule: {
    host: /^aw-games\.net$/
  },
  async ready() {
    const a = $('.iklan a');
    await $.openLink(a.href);
  }
});
