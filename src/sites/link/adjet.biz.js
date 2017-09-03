_.register({
  rule: {
    host: /^(www\.)?adjet\.biz$/,
  },
  async ready () {
    const m = $.searchFromScripts(/href=(\S+)/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    await $.openLink(m[1]);
  },
});
