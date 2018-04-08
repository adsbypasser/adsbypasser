_.register({
  rule: {
    host: [
      /^www\.pixsense\.net$/,
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
