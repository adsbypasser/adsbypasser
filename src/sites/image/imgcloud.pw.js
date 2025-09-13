_.register({
  rule: {
    host: [
      /^2i\.(cz|sk)$/,
      /^rintor\.space$/,
      /^[0-9]{1,3}xpics\.space$/,
      /^imgcloud\.pw$/,
      /^pilot007\.org$/,
      /^img\.javstore\.net$/,
      /^(lookmyimg|shotcan)\.com$/,
      /^www\.imghit\.com$/,
    ],
    path: /^\/(image|i)\/.*/,
  },
  async ready() {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
