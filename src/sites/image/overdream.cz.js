_.register({
  rule: {
    host: /^overdream\.cz$/,
    path: /^\/image\//,
  },
  async ready () {
    const img = $('#full_image');
    await $.openImage(img.src);
  },
});
