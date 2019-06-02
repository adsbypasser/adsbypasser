_.register({
  rule: {
    host: /^www\.turboimagehost\.com$/,
    path: /^\/p\//,
  },
  async ready () {
    const i = $('#uImage');
    await $.openImage(i.src);
  },
});
