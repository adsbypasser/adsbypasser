_.register({
  rule: {
    host: /^xxxwebdlxxx\.(org|top)$/,
  },
  async ready () { 
    const a = $('.centred, .centred_resize');
    await $.openImage(a.src);
  },
});
