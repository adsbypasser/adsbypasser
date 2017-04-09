_.register({
  rule: 'http://imagepix.org/image/*.html',
  async ready () {
    const i = $('img[border="0"]');
    await $.openImage(i.src);
  },
});
