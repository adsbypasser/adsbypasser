_.register({
  rule: 'http://img.3ezy.net/*.htm',
  async ready () {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
