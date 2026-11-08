/**
 * @domain lolinez.com
 */
_.register({
  rule: {
    host: /^www\.lolinez\.com$/,
    query: /^\?./,
  },
  async start() {
    await $.openLink($.url.search.slice(1));
  },
});
