/**
 * @domain mirrored.to
 */
_.register({
  rule: {
    host: /^(www\.)?mirrored\.to$/,
    path: /^\/files\//,
  },
  async ready() {
    const a = $(".secondary");
    a.click();
  },
});
