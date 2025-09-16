/**
 * @domain otomi-games.com
 */
_.register({
  rule: {
    host: /^otomi-games\.com$/,
    path: /^\/go\//,
  },
  async ready() {
    const ma = $("#wpsafe-link a");
    await $.openLink(ma.href);
  },
});
