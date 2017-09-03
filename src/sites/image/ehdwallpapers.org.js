_.register({
  rule: {
    host: /^ehdwallpapers\.org$/,
    path: /^\/images\/.*$/,
  },
  async ready () {
    const i = $('.entry-content.clearfix img');
    await $.openImage(i.src);
  },
});
