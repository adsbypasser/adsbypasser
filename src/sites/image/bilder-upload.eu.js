_.register({
  rule: 'http://www.bilder-upload.eu/show.php?file=*',
  async ready () {
    const i = $('input[type=image]');
    await $.openImage(i.src);
  },
});
