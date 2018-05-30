_.register({
  rule: {
    host: /^st\.wardhanime\.net$/,
    path: /^\/i\/\d+$/,
  },
  async ready () {
    const a = $('#wrapper > [class^="tombo"] > a[target="_blank"]');
    await $.openLink(a.href);
  },
});
