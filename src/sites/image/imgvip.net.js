_.register({
  rule: {
    host: [
      /^www\.imagespicy\.site$/,
      /^www\.(imgsky|imgfile)\.net$/,
    ],
    path: /^\/site\/v\/\d+$/,
  },
  async ready () {
    const a = $('#myUniqueImg').parentNode;
    await $.openLink(a.href);
  },
});

_.register({
  rule: {
    host: [
      /^www\.imagespicy\.site$/,
      /^www\.(imgsky|imgfile)\.net$/,
    ],
    path: /^\/[a-z|0-9]{4,10}$/,
  },
  async ready () {
    const matches = $.searchFromScripts(/document.getElementById\("soDaBug"\).src = "([^"]+)";/);
    await $.openImage(matches[1]);
  },
});
