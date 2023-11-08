_.register({
  rule: {
    host: /^usersdrive\.com$/,
  },
  async ready () {
    const a = $('a[class="btn btn-download"]');
    await $.openLink(a.href);
  },
});
