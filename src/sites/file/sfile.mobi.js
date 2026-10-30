/**
 * @domain sfile.co
 */
_.register({
  rule: {
    host: /^sfile\.co$/,
  },
  async ready() {
    await _.wait(8000);
    const a = $('a[id="download"]');
    await $.openLink(a.href);
  },
});
