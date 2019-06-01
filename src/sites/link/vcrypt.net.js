_.register({
  rule: {
    host: /^vcrypt\.net$/,
    path: /^\/fastshield\//,
  },
  async ready () {
    const v = $('form input.btncontinue');
    v.click();
  },
});
