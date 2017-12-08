_.register({
  rule: {
    host: /^(www\.)?ourl\.io$/,
    path: /^\/go\/\w+$/,
  },
  async ready () {
    $('form').submit();
  },
});
