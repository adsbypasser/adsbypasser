/**
 * @domain goo.st
 */
_.register({
  rule: {
    host: /^goo\.st$/,
  },
  async ready() {
    const b = $(".btn-primary");
    b.click();
  },
});
