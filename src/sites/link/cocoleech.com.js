/**
 * @domain cocoleech.com
 */
_.register({
  rule: {
    host: /^cocoleech\.com$/,
  },
  async ready() {
    const a = $(".btn.btn-block.btn-success");
    await $.openLink(a.href);
  },
});
