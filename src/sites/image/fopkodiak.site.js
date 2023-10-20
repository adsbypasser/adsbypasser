_.register({
  rule: {
    host: [
      /^fopkodiak\.site$/,
      /^img\.trafficimage\.club$/,
    ],
    path: /^\/image\//,
  },
  async ready () {
    const img = $('head > link[rel=image_src]');
    await $.openImage(img.href);
  }
});
