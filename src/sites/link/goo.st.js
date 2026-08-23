/**
 * @domain goo.st
 * @domain swzz.xyz
 */
_.register({
  rule: {
    host: [/^goo\.st$/, /^swzz\.xyz$/],
  },
  async ready() {
    const button = $(".btn-primary");
    button.click();
  },
});
