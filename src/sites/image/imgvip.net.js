
_.register({
  rule: [
    {
      host: [
        /^(www\.)?imgair\.net$/,
        /^img[a-z]{2,6}\.(buzz|site|store|online|website|xyz|cfd|sbs)$/,
        /^(hfneiott|lgjreelqq|pyotinle|pixmtke|optiye)\.buzz$/,
        /^picuekr\.site/,
        /^piclerz\.store/,
      ],
      path: /^\/[a-z|0-9]{4,10}$/,
    },
  ],
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("newImgE"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
