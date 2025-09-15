/**
 * @domain 13xpics.space
 * @domain 14xpics.space
 * @domain 2i.cz
 * @domain 2i.sk
 * @domain 37xpics.space
 * @domain 47xpics.space
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
