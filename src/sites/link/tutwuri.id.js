_.register({
  rule: {
    host: /^tutwuri\.id$/,
  },
  async ready() {
    await _.wait(1000);
    const a = $("#btn-1");
    a.click();
    await _.wait(12000);
    const b = $("#btn-2");
    b.click();
    const c = $("#btn-3");
    c.click();
  },
});
