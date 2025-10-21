/**
 * @domain katfile.cloud
 */
_.register({
  rule: {
    host: /^katfile\.cloud$/,
  },
  async ready() {
    const a = $('a[id="dlink"]');
    await $.openLink(a.href);
  },
});
