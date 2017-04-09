_.register({
  rule: {
    host: /^radikal\.ru$/,
    path: /^\/big\//,
  },
  async ready () {
    const i = $.$('.base-page_center > div:nth-child(2) > img:nth-child(1)');
    await $.openImage(i.src);
  },
});
