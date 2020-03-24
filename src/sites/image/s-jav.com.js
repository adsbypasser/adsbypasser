_.register({
  rule: {
    host: /^pic\.s-jav\.com$/,
  },
  async ready () {
    const img = $('.wp-post-image');
    await $.openImage(img.src);
  },
});
