_.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/,
    path: /(^\/\w+$|^\/go\/\w+$)/,
  },
  async ready () {
    $('form').submit();
  },
});
