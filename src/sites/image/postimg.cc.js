_.register({
  rule: {
    host: [
      /^postimg.cc$/,
      /^postlmg.cc$/,
      /^pixxxels.cc$/,
    ],
  },
  async ready () {
    const img = $('#main-image');
    await $.openImage(img.src);
  },
});
