_.register({
  rule: {
    host: /^(www\.)?fundurl\.com$/,
    query: /i=([^&]+)/,
  },
  async start (m) {
    await $.openLink(m.query[1]);
  },
});

_.register({
  rule: {
    host: /^(www\.)?fundurl\.com$/,
    path: /^\/(go-\w+|load\.php)$/,
  },
  async ready () {
    const f = $('iframe[name=fpage3]');
    await $.openLink(f.src);
  },
});
