.register({
  rule:
    {
      host: /^(www\.)?imgair\.net$/,
      path: /^\/[a-z|0-9]{4,10}$/,
    },
  async ready () {
    const matches = $.searchFromScripts(/document\.getElementById\("newImgE"\)\.src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
