_.register({
  rule: {
    host: [
      /^ethi\.in$/,
      /^st\.wardhanime\.net$/,
    ],
    path: /^\/i\/\d+$/,
  },
  async ready () {
    const a = $('#wrapper > [class^="tombo"] > a[target="_blank"]');
    await $.openLink(a.href);
  },
});
