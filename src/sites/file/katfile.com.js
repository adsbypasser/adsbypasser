_.register({
  rule: {
    host: /^katfile\.com$/,
  },
  async ready () {
    const a = $('a[id="dlink"]');
    await $.openLink(a.href);
  },
});
