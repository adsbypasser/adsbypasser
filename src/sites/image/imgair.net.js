_.register({
  rule:
    {
      host: [
        /^imgair\.net$/,
        /^imgblaze\.net$/,
        /^imgfrost\.net$/,
        /^imgqklw\.shop$/,
        /^imgrehd\.shop$/,
        /^imgtgd\.shop$/,
        /^cloudgallery\.net$/,
      ],
    },
  async ready () {
    const matches = $.searchFromScripts(/imgbg\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
