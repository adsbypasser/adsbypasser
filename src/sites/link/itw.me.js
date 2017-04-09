_.register({
  rule: {
    host: /^itw\.me$/,
    path: /^\/r\//,
  },
  async ready () {
    const f = $('.go-form');
    f.submit();
  },
});
