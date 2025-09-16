/**
 * @domain thinfi.com
 */
_.register({
  rule: {
    host: /^thinfi\.com$/,
  },
  async ready() {
    const a = $("div p a");
    await $.openLink(a.href);
  },
});
