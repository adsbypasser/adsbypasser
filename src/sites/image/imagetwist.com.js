/**
 * @domain croea.com
 * @domain fappic.com
 * @domain imagehaha.com
 * @domain imagenpic.com
 * @domain imageshimage.com
 * @domain imagetwist.com
 * @domain imagexport.com
 */
_.register({
  rule: {
    host: [
      /^croea\.com$/,
      /^fappic\.com$/,
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
