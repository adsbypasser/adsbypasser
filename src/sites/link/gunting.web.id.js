_.register({
  rule: {
    host: /^gunting\.web\.id$/,
    path: /^\/\w+$/,
  },
  async ready () {
    const l = $('a.btn-block.redirect');
    await $.openLink(l.href);
  },
});
