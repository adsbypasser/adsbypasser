_.register({
  rule: {
    host: /^www\.pic-upload\.de$/,
  },
  async ready () {
    const i = $('.preview_picture_2b');
    await $.openImage(i.src);
  },
});
