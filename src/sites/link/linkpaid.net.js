_.register({
  rule: {
    host: /^linkpaid\.net$/,
    path: /^\/go\//,
  },
  async ready () {
    const f = $('#btn-main');
    f.click();
  },
});
