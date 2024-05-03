_.register({
  rule: {
    host: [
      /^postlmg\.cc$/,
      /^pixxxels\.cc$/,
    ],
  },
  async ready () {
    const img = $('#main-image');
    await $.openImage(img.src);
  },
});
