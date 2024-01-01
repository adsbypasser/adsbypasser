_.register({
  rule: {
    host: [
      /^(37xpics|rintor)\.space$/,
      /^imgcloud\.pw$/,
      /^pilot007\.org$/,
      /^www\.imghit\.com$/,
    ],
    path: /^\/image\/.*/,
  },
  async ready () {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
