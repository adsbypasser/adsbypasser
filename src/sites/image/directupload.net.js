_.register({
  rule: 'https://*.directupload.net/file/*.htm',
  async ready () {
    const i = $('#ImgFrame');
    await $.openImage(i.src);
  },
});
