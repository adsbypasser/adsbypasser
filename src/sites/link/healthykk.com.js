_.register({
  rule: {
    host: /^healthykk\.com$/,
    path: /^\/wordpress\//,
  },
  async ready () {
    const h = $('#content center button');
    h.click();
  },
});
