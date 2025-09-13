_.register({
  rule: {
    host: /^multiup\.io$/,
  },
  async ready() {
    const b = $(".btn-info.btn-lg.btn-block");
    b.click();
  },
});
