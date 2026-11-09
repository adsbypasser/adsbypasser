/**
 * @domain simpcity.cr
 */
_.register({
  rule: {
    host: /^simpcity\.cr$/,
    path: /^\/redirect\/?$/,
    query: /(?:\?|&)to=([^&]+)/,
  },
  async start(m) {
    await $.openLink(atob(decodeURIComponent(m.query[1])));
  },
});
