_.register({
  rule: {
    host: /^(www\.)?cli\.gs$/,
  },
  async ready () {
    const a = $('a.RedirectLink');
    await $.openLink(a.href);
  },
});
