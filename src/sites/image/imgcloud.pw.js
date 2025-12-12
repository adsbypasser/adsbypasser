/**
 * @domain 14xpics.space
 * @domain 2i.cz
 * @domain 2i.sk
 * @domain img.javstore.net
 * @domain img.trafficimage.club
 * @domain imgcloud.pw
 * @domain imghit.com
 * @domain imgpulse.top
 * @domain lookmyimg.com
 * @domain pilot007.org
 * @domain rintor.space
 * @domain shotcan.com
 * @domain trafficimage.club
 */
_.register({
  rule: {
    host: [
      /^14xpics\.space$/,
      /^www\.2i\.(cz|sk)$/,
      /^imgcloud\.pw$/,
      /^www\.imghit\.com$/,
      /^img\.javstore\.net$/,
      /^imgpulse\.top$/,
      /^lookmyimg\.com$/,
      /^pilot007\.org$/,
      /^rintor\.space$/,
      /^shotcan\.com$/,
      /^(img\.)?trafficimage\.club$/,
    ],
    path: /^\/(image|i)\/.*/,
  },
  async ready() {
    const l = $('link[rel="image_src"]');
    await $.openImage(l.href);
  },
});
