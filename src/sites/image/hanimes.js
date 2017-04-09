_.register({
  rule: {
    host: /^www\.(h-animes|adultmove)\.info/,
    path: /^\/.+\/.+\/.+\.html$/,
  },
  async ready () {
    const a = $('.dlbutton2 > a');
    await $.openImage(a.href);
  },
});
