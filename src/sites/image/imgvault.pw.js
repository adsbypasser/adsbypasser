_.register({
  rule: {
    host: /^imgvault\.pw$/,
    path: /^\/view-image\//,
  },
  async ready () {
    const a = $('article div.span7 a[target="_blank"]');
    await $.openImage(a.href);
  },
});
