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
      /^croea\.com$/,
      /^imagenpic\.com$/,
      /^imageshimage\.com$/,
      /^imagetwist\.com$/,
      /^imagexport\.com$/,
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
