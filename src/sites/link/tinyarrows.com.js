_.register({
  rule: [
    {
      host: /^tinyarrows\.com$/,
      path: /^\/preview\.php$/,
      query: /^\?page=([^&]+)/,
    },
    {
      host: /^www\.javlibrary\.com$/,
      query: /url=(.+)$/,
    },
  ],
  async start (m) {
    await $.openLink(decodeURIComponent(m.query[1]));
  },
});
