_.register({
  rule: {
    host: /^(www|links)\.fiuxy\.(co|bz)$/,
  },
  async ready () {
    await $.openLink($('a.btn.a').href);
  }
});
