_.register({
  rule: {
    host: /^thotimg\.xyz$/,
  },
  async ready () {
    const img = $('center > img');
    await $.openImage(img.src);
  },
});
