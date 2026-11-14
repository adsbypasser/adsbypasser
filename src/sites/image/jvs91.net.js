/**
 * @domain jvs91.net
 */
_.register({
  rule: {
    host: /^jvs91\.net$/,
  },
  async ready() {
    const a = $('[class="button"]');
    await $.openLink(a.href);
  },
});
