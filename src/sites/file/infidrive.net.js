_.register({
  rule: {
    host: /^infidrive\.net$/,
  },
  async ready () {
    await _.wait(40000);
    const b = $('button.inline-flex:nth-child(2)');
    b.click();
  },
});
