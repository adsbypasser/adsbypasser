_.register({
  rule: {
    host: /^surfsees\.com$/,
    query: /^\?go=([a-zA-Z0-9]+)$/,
  },
  async start (m) {
    const surl = 'https://get.ujv.al/' + m.query[1];
    await $.openLink(surl);
  },
});

_.register({
  rule: {
    host: /^surfsees\.com$/,
    query: /^\?link=([a-zA-Z0-9]+)(clickarurl)$/,
  },
  async start (m) {
    const surl = 'https://get.ujv.al/' + m.query[1];
    await $.openLink(surl);
  },
});
