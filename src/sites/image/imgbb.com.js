_.register({
  rule: {
    host: [
      /^imgbb\.com$/,
      /^ibb\.co$/,
    ],
  },
  async ready () {
    const img = $('meta[property="og:image"]');
    await $.openImage(img.content);
  },
});
