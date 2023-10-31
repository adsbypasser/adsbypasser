_.register({
  rule: {
    host: /^tezzpic\.com$/,
  },
  async ready () {
    const img = $('img.picview');
    await $.openImage(img.src);
  },
});
