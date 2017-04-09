_.register({
  rule: {
    host: /^st\.kurogaze\.net$/,
    query: /r=(.+)/,
  },
  async start (m) {
    const r = atob(m.query[1]);
    await $.openLink(r);
  },
});

_.register({
  rule: {
    host: /^st\.kurogaze\.net$/,
  },
  async ready () {
    const a = $('a.redirect');
    await $.openLink(a.href);
  },
});
