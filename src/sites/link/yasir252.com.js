/**
 * @domain yasir252.com
 */
_.register({
  rule: {
    host: /^download\.yasir252\.com$/,
  },
  async ready() {
    const a = $('a[id="downloadBtn"]');
    await $.openLink(a.href);
  },
});
