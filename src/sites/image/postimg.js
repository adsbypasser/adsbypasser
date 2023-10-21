_.register({
  rule: [
    'https://postimg.cc/*',
    'https://pixxxels.cc/*',
  ],
  async ready () {
    const img = $('#main-image');
    await $.openImage(img.src);
  },
});
