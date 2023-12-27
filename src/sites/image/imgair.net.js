_.register({
  rule:
    {
      host: [
        /^cloudgallery\.net$/,
        /^imgair\.net$/,
        /^imgblaze\.net$/,
        /^imgfrost\.net$/,
        /^imgqklw\.shop$/,
        /^imgrehd\.shop$/,
        /^imgtgd\.shop$/,
      ],
    },
  async ready () {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
