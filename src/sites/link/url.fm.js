_.register({
  rule: {
    host: /^url\.fm$/,
  },
  async ready () {
    const a = $('#clickbtn a');
    await $.openLink(a.href);
  },
});
