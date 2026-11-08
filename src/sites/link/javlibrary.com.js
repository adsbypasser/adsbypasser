/**
 * @domain javlibrary.com
 */
_.register({
  rule: {
    host: /^www\.javlibrary\.com$/,
    query: /[?&]url=/,
  },
  async start() {
    await $.openLink($.url.searchParams.get("url"));
  },
});
