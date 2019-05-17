_.register({
  rule: {
    host: /^surfsees\.com$/,
    query: /^\?go=/,
  },
  async ready () {
    const s = $('#clickar-link a');
    await $.openLink(s.href);
  },
});
