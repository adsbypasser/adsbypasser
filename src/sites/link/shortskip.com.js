_.register({
  rule: {
    host: /^www\.shortskip\.com$/,
    path: /^\/short\.php$/,
    query: /i=([^&]+)/,
  },
  async start (m) {
    const url = decodeURIComponent(m.query[1]);
    await $.openLink(url);
  },
});
