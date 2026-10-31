/**
 * @domain cloudgallery.net
 * @domain imgair.net
 * @domain imgblaze.net
 * @domain imgfrost.net
 * @domain imgouhmde.sbs
 * @domain imgouskel.sbs
 * @domain pixsera.net
 */
_.register({
  rule: {
    host: [
      /^cloudgallery\.net$/,
      /^img[a-z]{2,10}\.(sbs|shop)$/,
      /^imgair\.net$/,
      /^imgblaze\.net$/,
      /^imgfrost\.net$/,
      /^pic[a-z]{2,10}\.(sbs|shop)$/,
      /^pix[a-z]{2,10}\.sbs$/,
      /^pixsera\.net$/,
    ],
  },
  async ready() {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1], { referer: true });
  },
});
