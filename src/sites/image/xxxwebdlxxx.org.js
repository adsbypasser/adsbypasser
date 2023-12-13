_.register({
  rule: {
    host: /^xxxwebdlxxx\.(org|top)$/,
  },
  async ready () { 
    const a = $('.centred');
    await $.openImage(a.src);
  },
});
