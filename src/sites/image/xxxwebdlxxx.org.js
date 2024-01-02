_.register({
  rule: {
    host: /^xxxwebdlxxx\.(org|top)$/,
  },
  async ready () { 
    const a = $('.centred_resized');
    await $.openImage(a.src);
  },
});
