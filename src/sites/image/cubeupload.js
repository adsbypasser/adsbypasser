_.register({
  rule: 'http://cubeupload.com/im/*',
  async ready () {
    const img = $('img.galleryBigImg');
    await $.openImage(img.src);
  },
});
