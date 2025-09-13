_.register({
  rule: {
    host: /^spacetica\.com$/,
  },
  async ready() {
    const b = $(".btn.btn-primary.btn-xs");
    b.click();
  },
});
