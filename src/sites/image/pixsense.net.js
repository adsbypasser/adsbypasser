_.register({
  rule: {
    host: [
      /^www\.pixsense\.net$/,
      /^www\.imagespicy\.site$/,
      /^www\.img(sky|file|)\.net$/,
    ],
    path: /^\/site\/v\/\d+$/,
  },
  async ready () {
    const a = $('#myUniqueImg').parentNode;
    await $.openLink(a.href);
  },
});
