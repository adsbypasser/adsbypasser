_.register({
  rule: {
    host: /^10co\.(biz|xyz|co|me)$/,
  },
  async ready () {
    const d = $('.go');
    await $.openLink(d.dataset.href);
  },
});
