_.register({
  rule: [
    {
      host: [
        /^imgair\.net$/,
        /^imgblaze\.net$/,
        /^imgfrost\.net$/,
        /^www\.cloudgallery\.net$/,
      ],
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
