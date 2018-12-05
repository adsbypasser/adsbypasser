_.register({
  rule: [
    'http://*.abload.de/image.php?img=*',
    'http://www.imageup.ru/*/*/*.html',
  ],
  async ready () {
    const i = $('#image');
    await $.openImage(i.src);
  },
});
