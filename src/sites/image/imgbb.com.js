_.register({
  rule: {
    host: /^imgbb\.com$/
  },
  async ready () {
    const img = $('.image-viewer-container img');
    await $.openImage(img.src);
  },
});
