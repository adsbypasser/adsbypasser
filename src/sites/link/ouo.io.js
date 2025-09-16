/**
 * @domain ouo.io
 * @domain ouo.press
 */
_.register({
  rule: {
    host: /^(www\.)?ouo\.(io|press)$/,
    path: /(^\/\w+$|^\/go\/\w+$)/,
  },
  async ready() {
    $("form").submit();
  },
});
