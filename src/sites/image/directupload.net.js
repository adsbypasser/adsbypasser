_.register({
  rule: 'http://*.directupload.net/file/*.htm',
  async ready () {
    const i = $('#ImgFrame');
    await $.openImage(i.src);
  },
});
