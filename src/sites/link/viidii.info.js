_.register({
  rule: {
    host: /^www\.viidii\.info$/,
    query: /url=([^&]+)/,
  },
  async start (m) {
    const url = decodeURIComponent(m.query[1]);
    await $.openLink(url);
  },
});


_.register({
  rule: {
    host: /^www\.viidii\.info$/,
  },
  async ready () {
    const o = $('.bglink');
    await $.openLink(o.href);
  },
});
