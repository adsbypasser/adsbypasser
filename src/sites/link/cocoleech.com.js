_.register({
  rule: {
    host: /^cocoleech\.com$/,
  },
  async ready () {
    const a = $('#download');
    await $.openLink(a.href);
  },
});
