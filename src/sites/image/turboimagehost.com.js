_.register({
  rule: {
    host: /^www\.turboimagehost\.com$/,
    path: /^\/p\//,
  },
  async ready () {
    const i = $('#imageid');
    await $.openImage(i.src);
  },
});
