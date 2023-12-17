_.register({
  rule: {
    host: /^www\.imagevenue.com$/,
  },
  async ready () {
    const i = $('a[title] img#main-image');
    await $.openImage(i.src);
  },
});
