/**
 * @domain ibb.co
 * @domain imgbb.com
 */
_.register({
  rule: {
    host: [
      /^ibb\.co$/,
      /^imgbb\.com$/,
    ],
  },
  async ready() {
    const img = $(".image-viewer-container img");
    await $.openImage(img.src);
  },
});
