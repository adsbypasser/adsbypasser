/**
 * @domain katfile.online
 */
_.register({
  rule: {
    host: /^katfile\.online$/,
  },
  async ready() {
    const a = $('a[id="dlink"]');
    await $.openLink(a.href);
  },
});
