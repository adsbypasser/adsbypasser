_.register({
  rule: {
    host: [
      /^im\.ge$/,
      /^img\.trafficimage\.club$/,
      /^trafficimage\.club$/,
    ],
  },
  async ready () {
    const img = $('meta[property="og:image"]');
    await $.openImage(img.content);
  }
});
