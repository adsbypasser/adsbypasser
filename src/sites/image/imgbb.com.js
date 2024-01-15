_.register({
  rule: {
    host: [
      /^imgbb\.com$/,
      /^ibb\.co$/,
    ],
  },
  async ready () {
    const img = $('.image-viewer-container img');
    await $.openImage(img.src);
  },
});
