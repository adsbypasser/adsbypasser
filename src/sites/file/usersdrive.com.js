/**
 * @domain usersdrive.com
 */
_.register({
  rule: {
    host: /^usersdrive\.com$/,
  },
  async ready() {
    const a = $(".btn-download");
    await $.openLink(a.href);
  },
});
