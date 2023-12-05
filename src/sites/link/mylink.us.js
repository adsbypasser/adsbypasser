_.register({
  rule: {
    host:
      /^mylink\.us$/,
  },
  async ready () {
    await _.wait(8000);
    const a = $('div.skip_btn a');
    a.click();
  },
});
