_.register({
  rule: {
    host: [
      /^cloudgallery\.net$/,
      /^imgair\.net$/,
      /^imgblaze\.net$/,
      /^imgfrost\.net$/,
      /^imgfira\.cc$/,
      /^img[a-z]{2,10}\.(sbs|shop)$/,
      /^pic[a-z]{2,10}\.(sbs|shop)$/,
      /^pix[a-z]{2,10}\.sbs$/,
    ],
  },
  async ready() {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1], { referer: true });
  },
});
