_.register({
  rule: {
    host: /^x\.pixfarm\.net$/,
    path: /^\/sexy\/\d+\/\d+\/.+\.html$/,
  },
  async ready () {
    const i = $('img');
    await $.openImage(i.src);
  },
});
