_.register({
  rule: {
    host: /^cubeupload.com$/,
  },
  async ready () {
    const img = $('img.galleryBigImg');
    await $.openImage(img.src);
  },
});
