_.register({
  rule: {
    host: /^zzz\.gl$/,
  },
  async ready () {
    const m = $.searchFromScripts(/const domainurl = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    await $.openLink(m[1]);
  },
});
