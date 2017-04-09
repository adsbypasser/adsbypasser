_.register({
  rule: 'http://www.bilder-space.de/*.htm',
  async ready () {
    $.remove('iframe');
    const img = $('img.picture');
    await $.openImage(img.src);
  },
});
