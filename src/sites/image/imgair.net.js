_.register({
  rule:
    {
      host: [
        /^cloudgallery\.net$/,
        /^imgair\.net$/,
        /^imgblaze\.net$/,
        /^imgfrost\.net$/,
        /^img[a-z]{2,6}\.shop$/,
        /^img[a-z]{2,6}\.sbs$/,
      ],
    },
  async ready () {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
