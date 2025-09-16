/**
 * @domain croea.com
 * @domain imagenpic.com
 * @domain imageshimage.com
 * @domain imagetwist.com
 * @domain imagexport.com
 * @domain vipr.im
 */
_.register({
  rule: {
    host: [
      /^imagetwist\.com$/,
      /^imagenpic\.com$/,
      /^imagexport\.com$/,
      /^imageshimage\.com$/,
      /^croea\.com$/,
      /^vipr\.im$/,
    ],
  },
  async ready() {
    const i = $("img.pic");
    if (window.location.host === "vipr.im") {
      await $.openImage(i.src, { replace: true });
    } else {
      await $.openImage(i.src);
    }
  },
});
