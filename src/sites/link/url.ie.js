_.register({
  rule: {
    host: /^url\.ie$/,
  },
  async ready () {
    const a = $('a[title="Link to original URL"]');
    await $.openLink(a.href);
  },
});
