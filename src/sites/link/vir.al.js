_.register({
  rule: {
    host: /^(www\.)?vir\.al$/,
  },
  async ready () {
    const m = $.searchFromScripts(/const target_url = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    await $.openLink(m[1]);
  },
});
