_.register({
  rule: {
    host: /^nmac\.to$/,
    path: /^\/dl\/(.+)/,
  },
  async ready() {
    const a = $(".btn-medium.btn-block");
    await $.openLink(a.href);
  },
});
