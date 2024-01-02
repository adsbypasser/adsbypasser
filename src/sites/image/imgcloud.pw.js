_.register({
  rule: {
    host: [
      /^2i\.(cz|sk)$/,
      /^(37xpics|picnew|rintor)\.space$/,
      /^imgcloud\.pw$/,
      /^pilot007\.org$/,
      /^img\.javstore\.net$/,
      /^www\.imghit\.com$/,
      /^xxxaddicted\.top$/,
    ],
    path: /^\/(image|i)\/.*/,
  },
  async ready () {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
