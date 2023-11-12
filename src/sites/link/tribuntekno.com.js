_.register({
  rule: {
    host: /^tribuntekno\.com$/,
  },
  async ready () {
    const b = $.$('#lite-human-verif-button');
    if (b) {
      b.click();
    }
    const c = $.$('#lite-start-sora-button');
    if (c) {
      c.click();
    }
  },
});
