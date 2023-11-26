_.register({
  rule: {
    host: /^1link\.club$/,
  },
  async ready () {
    const a = $('#download.btn');
    await $.openLink(a.href);
  },
});
