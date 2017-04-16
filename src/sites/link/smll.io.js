_.register({
  rule: {
    host: /^smll\.io$/,
  },
  async ready () {
    const m = $.searchFromScripts(/window\.location="([^"]*)";/);
    await $.openLink(m[1]);
  },
});
