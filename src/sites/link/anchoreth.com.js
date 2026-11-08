/**
 * @domain anchoreth.com
 */
_.register({
  rule: {
    host: /^anchoreth\.com$/,
    query: /[?&]v=/,
  },
  async start() {
    await $.openLink(atob($.url.searchParams.get("v")));
  },
});
