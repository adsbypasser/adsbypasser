/**
 * @domain dlink3.com
 */
_.register({
  rule: {
    host: /^www\.dlink3\.com$/,
  },
  async ready() {
    await _.wait(12000);
    const a = $('[class="myButton"]');
    await $.openLink(a.href);
  },
});
