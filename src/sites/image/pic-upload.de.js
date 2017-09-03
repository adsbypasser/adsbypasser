_.register({
  rule: 'http://www.pic-upload.de/view-*.html',
  async ready () {
    $.remove('.advert');
    const i = $('img.preview_picture_2b, img.original_picture_2b');
    await $.openImage(i.src);
  },
});
