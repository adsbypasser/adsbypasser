/**
 * @domain cpmlink.net
 */
_.register({
  rule: {
    host: /^cpmlink\.net$/,
  },
  async ready() {
    const a = $("#btn-main");
    await $.openLink(a.href);
  },
});
