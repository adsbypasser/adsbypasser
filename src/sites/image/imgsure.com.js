_.register({
  rule: {
    host: /^(imgsure|picexposed)\.com$/,
  },
  async ready () {
    const i = $('img.pic');
    await $.openImage(i.src);
  },
});
