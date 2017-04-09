_.register({
  rule: {
    host: /^1pics\.ru$/,
  },
  async ready () {
    const img = $('img[alt$="1Pics.Ru"]');
    await $.openImage(img.src);
  },
});
