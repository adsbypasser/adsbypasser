_.register({
  rule: {
    host: /^(picexposed|croea)\.com$/,
  },
  async ready () {
    const i = $('img.pic');
    await $.openImage(i.src);
  },
});
