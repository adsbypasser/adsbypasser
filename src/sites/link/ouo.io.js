_.register({
  rule: {
    host: [
      /^(www\.)?ouo\.(io|press)$/,
      /^(sloomp|novaenreta)\.space$/,
    ],
    path: /^\/go\/\w+$/,
  },
  async ready () {
    $('form').submit();
  },
});
