_.register({
  rule: {
    host:
      /^a2zapk\.io$/,
  },
  async ready () {
    const a = $('#dlbtn > li:nth-child(3) > a:nth-child(1)');
    await $.openLink(a.href);
  },
});
