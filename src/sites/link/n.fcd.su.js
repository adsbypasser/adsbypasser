/**
 * @domain n.fcd.su
 */
_.register({
  rule: {
    host: /^n\.fcd\.su$/,
  },
  async ready() {
    const btn = $("a.btn:nth-child(2)");
    await $.openLink(btn.href);
  },
});
