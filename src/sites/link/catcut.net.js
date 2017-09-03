_.register({
  rule: {
    host: /^catcut\.net$/,
  },
  async ready () {
    const a = $('#rbs');
    await $.openLink(a.href);
  },
});
