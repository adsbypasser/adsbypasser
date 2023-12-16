_.register({
  rule: {
    host: /^www\.imagebam\.com$/,
  },
  async ready () {
    const img = $('img.main-image');
    await $.openImage(img.src);
  },
});
