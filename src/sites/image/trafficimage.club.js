/**
 * @domain img.trafficimage.club
 * @domain trafficimage.club
 */
_.register({
  rule: {
    host: /^(img\.)?trafficimage\.club$/,
    path: /^\/image\//,
  },
  async ready() {
    const img = $('meta[property="og:image"]');
    await $.openImage(img.content);
  },
});
