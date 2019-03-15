_.register({
  rule: {
    host: /^welcome\.indihome\.co.id\/landing-page$/,
    path: /^\/[a-zA-Z0-9]+/,
  },
  async ready () {
    const s = $('a');
    await $.openLink(s[0].href);
  },
});
