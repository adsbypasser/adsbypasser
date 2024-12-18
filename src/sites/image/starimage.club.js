_.register({
  rule: {
    host: /^starimage\.club$/,
    path: /^\/image\/.+$/,
  },
  async ready () {
    const i = $(img.no-select.cursor-zoom-in);
    await $.openImage(i.src);
  },
});
