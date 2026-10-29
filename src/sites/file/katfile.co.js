/**
 * @domain katfile.co
 */
_.register({
  rule: {
    host: /^katfile\.co$/,
  },
  async ready() {
    await _.wait(1000);
    const b = $(".btn.btn-default");
    b.click();
  },
});
