/**
 * @domain 14xpics.space
 * @domain 2i.cz
 * @domain 2i.sk
 * @domain img.javstore.net
 * @domain imgcloud.pw
 * @domain imghit.com
 * @domain lookmyimg.com
 * @domain pilot007.org
 * @domain rintor.space
 * @domain shotcan.com
 */
_.register({
  rule: {
    host: [
      /^2i\.(cz|sk)$/,
      /^14xpics\.space$/,
      /^img\.javstore\.net$/,
      /^imgcloud\.pw$/,
      /^(lookmyimg|shotcan)\.com$/,
      /^pilot007\.org$/,
      /^rintor\.space$/,
      /^www\.imghit\.com$/,
    ],
    path: /^\/(image|i)\/.*/,
  },
  async ready() {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
