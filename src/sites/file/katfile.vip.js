/**
 * @domain katfile.vip
 */
_.register({
  rule: {
    host: /^katfile\.vip$/,
  },
  async ready() {
    const a = $('a[id="dlink"]');
    await $.openLink(a.href);
  },
});
