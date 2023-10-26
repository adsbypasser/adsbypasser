_.register({
  rule: {
    host: /^1link\.club$/,
  },
  async ready () {
    const a = $('a.btn.btn-lg.btn-outline');
    await $.openLink(a.href);
  },
});
