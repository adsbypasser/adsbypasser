_.register({
  rule: 'http://imageshost.ru/photo/*/id*.html',
  async ready () {
    const a = $('#bphoto a');
    await $.openImage(a.href);
  },
});
