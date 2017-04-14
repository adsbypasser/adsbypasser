_.register({
  rule: {
    host: /^www\.pixsense\.net$/,
    path: /^\/site\/v\/\d+$/,
  },
  async ready () {
    const a = $('#myUniqueImg').parentNode;
    await $.openLink(a.href);
  },
});
