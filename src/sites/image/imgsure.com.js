_.register({
  rule: {
    host: /^(imgsure|picexposed|croea)\.com$/,
  },
  async ready () {
    const i = $('img.pic');
    await $.openImage(i.src);
  },
});
