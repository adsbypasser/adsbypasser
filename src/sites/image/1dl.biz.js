_.register({
  rule: [
    {
      host: /^1(dl|be)\.biz$/,
      path: /^\/\w\.php$/,
      query: /^\?\w\/\d+$/,
    },
    {
      host: /^img\.1dl\.biz$/,
      path: /^\/\w\.php$/,
      query: /^\?\w\/([\d/]+)$/,
    },
  ],
  async ready () {
    const a = $('.main a, .main-l a');
    await $.openImage(a.href, {
      referer: true,
    });
  },
});
