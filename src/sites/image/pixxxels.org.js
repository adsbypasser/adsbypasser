_.register({
  rule: {
    host: /^pixxxels\.cc$/,
  },
  async ready () {
    const img = $.$('#main-image');
    await $.openImage(img.dataset.full);
  },
});
