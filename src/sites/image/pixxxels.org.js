_.register({
  rule: {
    host: /^pixxxels\.org$/,
  },
  async ready () {
    const img = $.$('#main-image');
    await $.openImage(img.dataset.full);
  },
});
