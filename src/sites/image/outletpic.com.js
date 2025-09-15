/**
 * @domain dewimg.com
 * @domain outletpic.com
 * @domain pictwn.com
 * @domain picyield.com
 * @domain tezzpic.com
 */
_.register({
  rule: {
    host: [
      /^dewimg\.com$/,
      /^outletpic\.com$/,
      /^pictwn\.com$/,
      /^picyield\.com$/,
      /^tezzpic\.com$/,
    ],
  },
  async ready() {
    const img = $("center > img.picview");
    await $.openImage(img.src);
  },
});
