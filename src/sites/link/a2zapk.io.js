/**
 * @domain a2zapk.io
 */
_.register({
  rule: {
    host: /^a2zapk\.io$/,
  },
  async ready() {
    const a = $("#dlbtn li a");
    await $.openLink(a.href);
  },
});
