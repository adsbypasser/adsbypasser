/**
 * @domain go.bitcosite.com
 * @domain go.linksly.co
 * @domain goo.st
 * @domain linksly.co
 */
_.register({
  rule: {
    host: [/^linksly\.co$/, /^goo\.st$/],
  },
  async ready() {
    const b = $(".btn-primary");
    b.click();
  },
});

_.register({
  rule: {
    host: [/^go\.bitcosite\.com$/, /^go\.linksly\.co$/],
  },
  async ready() {
    await _.wait(8000);
    const a = $(".btn-success.btn-lg.get-link");
    await $.openLink(a.href);
  },
});
