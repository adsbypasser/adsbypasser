_.register({
  rule: {
    host: /^(www\.)?fiuxy\.co$/,
    path: /^\/links?\/$/,
  },
  async ready () {
    await $.openLink($('a.btn.a').href);
  }
});
