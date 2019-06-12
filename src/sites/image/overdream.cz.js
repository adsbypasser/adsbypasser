_.register({
  rule: {
    host: [
      /^overdream\.cz$/,
      /^piclick\.org$/,
    ],
    path: /^\/image\//,
  },
  async ready () {
    const img = $('#full_image');
    await $.openImage(img.src);
  },
});
