/**
 * @domain icutlink.com
 */
_.register({
  rule: {
    host: /^icutlink\.com$/,
  },
  async ready() {
    await _.wait(10000);
    const a = $(".btn-success.btn-lg.get-link");
    await $.openLink(a);
  },
});
