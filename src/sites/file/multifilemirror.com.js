_.register({
  rule: {
    host: /^multifilemirror\.com$/,
  },
  async ready () {
    const m = $('#lcode form button');
    m.click();
  },
});
