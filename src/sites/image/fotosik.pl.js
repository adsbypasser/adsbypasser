_.register({
  rule: {
    host: /^www\.fotosik\.pl$/,
  },
  async ready () {
    const i = $('.simple-photo img');
    await $.openImage(i.src);
  },
});
