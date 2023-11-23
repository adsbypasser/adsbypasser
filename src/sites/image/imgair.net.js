_.register({
  rule: [
    {
      host: [
        /^imgair\.net$/,
        /^imgfrost\.net$/,
        /^www\.cloudgallery\.net$/,
        /^imgsaqe\.sbs$/,
      ],
      path: /^\/[a-z|0-9]{4,10}$/,
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("newImgE"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
