_.register({
  rule: {
    host: /^beeimg\.com$/,
    path: /\/view\/.*/,
  },
  async ready () {
    const img = $('img.img-responsive');
    await $.openImage(img.src);
  },
});
