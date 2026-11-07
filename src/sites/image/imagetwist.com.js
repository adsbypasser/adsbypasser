/**
 * @domain croea.com
 * @domain imagehaha.com
 * @domain imagenpic.com
 * @domain imageshimage.com
 * @domain imagetwist.com
 * @domain imagexport.com
 * @domain picshick.com
 * @domain phun.imagetwist.com
 */

// These are all domains of imagetwist.com

_.register({
  rule: {
    host: [
      /^croea\.com$/,
      /^imagehaha\.com$/,
      /^imagenpic\.com$/,
      /^imageshimage\.com$/,
      /^(?:phun\.)?imagetwist\.com$/,
      /^imagexport\.com$/,
      /^picshick\.com$/,
    ],
  },
  async ready() {
    const i = $("img.pic");
    await $.openImage(i.src);
  },
});
