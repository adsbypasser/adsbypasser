_.register({
  rule: {
    host: /^fopkodiak\.site$/,
    path: /^\/image\//,
  },
  async ready () {
    const img = $('head > link[rel=image_src]');
    await $.openImage(img.href);
  }
});
