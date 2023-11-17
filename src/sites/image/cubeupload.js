_.register({
  rule: 'https://cubeupload.com/im/*',
  async ready () {
    const img = $('img.galleryBigImg');
    await $.openImage(img.src);
  },
});
