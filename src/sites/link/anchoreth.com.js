/**
 * @domain anchoreth.com
 */
_.register({
  rule: {
    host: /^anchoreth\.com$/,
    query: /v=([^&]+)/,
  },
  async start(m) {
    await $.openLink(atob(m.query[1]));
  },
});
