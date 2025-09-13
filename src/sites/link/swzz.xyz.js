_.register({
  rule: {
    host: /^swzz\.xyz$/,
    path: /^\/link\//,
  },
  async ready() {
    const g = $("a.btn.btn-primary");
    await $.openLink(g.href);
  },
});
