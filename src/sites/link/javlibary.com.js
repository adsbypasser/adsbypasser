_.register({
  rule:
    {
      host: /^www\.javlibrary\.com$/,
      query: /url=([^&]+)/,
    },
  async start (m) {
    await $.openLink(decodeURIComponent(m.query[1]));
  },
});
