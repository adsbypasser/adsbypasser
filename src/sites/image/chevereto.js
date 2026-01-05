/**
 * @domain 14xpics.space
 * @domain 2i.cz
 * @domain 2i.sk
 * @domain img.javstore.net
 * @domain img.trafficimage.club
 * @domain imgcloud.pw
 * @domain imghit.com
 * @domain imgpulse.top
 * @domain imgxxt.in
 * @domain lookmyimg.com
 * @domain orangepix.is
 * @domain pilot007.org
 * @domain rintor.space
 * @domain shotcan.com
 * @domain trafficimage.club
 */

// These are all sites powered by Chevereto image hosting software

_.register({
  rule: {
    host: [
      /^14xpics\.space$/,
      /^www\.2i\.(cz|sk)$/,
      /^imgcloud\.pw$/,
      /^www\.imghit\.com$/,
      /^img\.javstore\.net$/,
      /^imgpulse\.top$/,
      /^imgxxt\.in$/,
      /^lookmyimg\.com$/,
      /^orangepix\.is$/,
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
