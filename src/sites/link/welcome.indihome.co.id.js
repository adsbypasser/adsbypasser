_.register({
  rule: {
    host: /^welcome\.indihome\.co\.id$/,
    path: /^\/landing-page\//,
  },
  async ready () {
    const s = $('a');
    await $.openLink(s[0].href);
  },
});
