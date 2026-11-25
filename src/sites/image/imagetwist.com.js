/**
 * @domain croea.com
 * @domain imagehaha.com
 * @domain imagenpic.com
 * @domain imageshimage.com
 * @domain imagetwist.com
 * @domain imagexport.com
 * @domain phun.imagetwist.com
 * @domain picshick.com
 * @domain picturelol.com
 */

// These are all domains of imagetwist.com

_.register({
  rule: {
    host: [
      /^(?:phun\.)?imagetwist\.com$/,
      /^croea\.com$/,
      /^imagehaha\.com$/,
      /^imagenpic\.com$/,
      /^imageshimage\.com$/,
      /^imagexport\.com$/,
      /^picshick\.com$/,
      /^picturelol\.com$/
    ],
  },
  async ready() {
    const i = $("img.pic");
    await $.openImage(i.src);
  },
});
