/**
 * @domain goo.st
   @domain shortmoz.link
   @domain swzz.xyz
 */
_.register({
  rule: {
    host: [/^goo\.st$/, /^shortmoz\.link$/, /^swzz\.xyz$/],
  },
  async ready() {
    const button = $(".btn-primary");
    button.click();
  },
});
