_.register({
  rule: {
    host: /^picstream\.tv$/,
    path: /^\/.*\/.*\.html$/,
  },
  async ready () {
    const img = $('#view1 > div:nth-child(1) > img:nth-child(1)');
    await $.openImage(img.src);
  },
});
