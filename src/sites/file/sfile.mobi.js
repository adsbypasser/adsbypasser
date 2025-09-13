_.register({
  rule: {
    host: /^sfile\.mobi$/,
  },
  async ready() {
    await _.wait(8000);
    const btn = $("#download");
    btn.click();
  },
});
