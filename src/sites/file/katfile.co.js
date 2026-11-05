/**
 * @domain katfile.co
 * @domain katfile.com
 */
_.register({
  rule: {
    host: [/^katfile\.co$/,/^katfile\.com$/],
  },
  async ready() {
    await _.wait(1000);
    const b = $(".btn.btn-default");
    b.click();
  },
});
