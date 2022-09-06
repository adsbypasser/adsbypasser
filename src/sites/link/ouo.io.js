_.register({
  rule: {
    host: [
      /^(www\.)?ouo\.(io|press)$/,
      /^(sloomp|novaenreta)\.space$/,
    ],
    path: /(^\/\w+$|^\/go\/\w+$)/,
  },
  async ready () {
    $('form').submit();
  },
});
