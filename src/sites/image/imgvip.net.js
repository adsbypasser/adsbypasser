_.register({
  rule: {
    host: [
      /^www\.(imgsky|imgfile|imgsee)\.net$/,
      /^www\.imagespicy\.site$/,
    ],
    path: /^\/site\/v\/\d+$/,
  },
  async ready () {
    const a = $('#myUniqueImg').parentNode;
    await $.openLink(a.href);
  },
});

_.register({
  rule: [
    {
      host: [
        /^www\.(imgsky|imgfile|imgsee)\.net$/,
        /^www\.imagespicy\.site$/,
        /^(imgxen|imgweng|imgfsh)\.xyz$/,
      ],
      path: /^\/[a-z|0-9]{4,10}$/,
    },
    {
      host: [
        /^(www\.)?imgair\.net$/,
        /^www\.cloudgallery\.net$/,
      ],
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("soDaBug"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
