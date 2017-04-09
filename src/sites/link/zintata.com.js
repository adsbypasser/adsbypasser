_.register({
  rule: {
    host: /^www\.zintata\.com$/,
    path: /^\/link\/$/,
  },
  async ready () {
    const a = $('#one > center:nth-child(3) > a:nth-child(1)');
    await $.openLink(a.href);
  },
});
