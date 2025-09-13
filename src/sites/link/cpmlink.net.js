_.register({
  rule: {
    host: /^cpmlink\.net$/,
  },
  async ready() {
    const a = $("#btn-main");
    await $.openLink(a.href);
  },
});
