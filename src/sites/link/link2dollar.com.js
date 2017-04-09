_.register({
  rule: {
    host: /\.link2dollar\.com$/,
    path: /^\/\d+$/,
  },
  async ready () {
    let m = $.searchFromScripts(/const rlink = '([^']+)';/);
    if (!m) {
      throw new _.AdsBypasserError('site changed');
    }
    m = m[1];
    await $.openLink(m);
  },
});
