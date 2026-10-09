/**
 * @domain croea.com
 * @domain imagehaha.com
 * @domain imagenpic.com
 * @domain imageshimage.com
 * @domain imagetwist.com
 * @domain imagexport.com
 * @domain vipr.im
 */

// These are all domains of imagetwist.com

_.register({
  rule: {
    host: [
      /^croea\.com$/,
      /^imagehaha\.com$/,
      /^imagenpic\.com$/,
      /^imageshimage\.com$/,
      /^imagetwist\.com$/,
      /^imagexport\.com$/,
    ],
  },
  async ready() {
    const i = $("img.pic");
    await $.openImage(i.src);
  },
});

_.register({
  rule: {
    host: [/^vipr\.im$/],
  },
  async ready() {
    const i = $("img.pic");
    // to ignore download header
    await $.openImage(i.src, {
      replace: true,
    });
  },
});
