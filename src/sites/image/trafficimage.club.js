/**
 * @domain im.ge
 * @domain img.trafficimage.club
 * @domain trafficimage.club
 */
_.register({
  rule: [
    {
      host: [/^img\.trafficimage\.club$/, /^trafficimage\.club$/],
      path: /^\/image\//,
    },
    {
      host: /^im\.ge$/,
      path: /^\/i\//,
    },
  ],
  async ready() {
    const img = $('meta[property="og:image"]');
    await $.openImage(img.content);
  },
});
