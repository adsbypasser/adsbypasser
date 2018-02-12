_.register({
  rule: {
    host: [
    /^otoviral\.racing$/,
    /^www\.lifesurance\.info$/,
    ]
  },
  async ready () {
    const a = $.searchFromScripts(/var a='([^']+)'/);
    await $.openLink(a[1]);
  },
});
