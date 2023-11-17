_.register({
  rule: 'https://www.pic-upload.de/view-*.html',
  async ready () {
    const i = $('img.preview_picture_2b');
    await $.openImage(i.src);
  },
});
