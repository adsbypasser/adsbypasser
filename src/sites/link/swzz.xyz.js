_.register({
  rule: {
    host: /^swzz\.xyz$/,
    path: /^\/link\/\w+\/$/,
  },
  async ready () {
    const g = $('a.btn-wrapper.link');
    await $.openLink(g.href);
  },
});
