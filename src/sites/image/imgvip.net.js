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
        /^(imgxen|imgweng|imgtiger|imgvivo|imgwewo|imgflyer)\.xyz$/,
      ],
      path: /^\/[a-z|0-9]{4,10}$/,
    },
    {
      host: [
        /^(www\.)?imgair\.net$/,
        /^(www\.)?imageking\.xyz$/,
        /^www\.cloudgallery\.net$/,
        /^kekolangti\.com$/,
        /^imgkia\.buzz$/,
      ],
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("soDaBug"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});

_.register({
  rule: [
    {
      host: [
        /^imgkuiw\.xyz$/,
        /^img[a-z]{2,6}\.buzz$/,
      ],
      path: /^\/[a-z|0-9]{4,10}$/,
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("newImgE"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
