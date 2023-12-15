_.register({
  rule: {
    host: /^2i\.(sk|cz)$/,
  },
  async ready () {
    const m = $('meta[property="og:image"]');
    await $.openImage(m.content);
  },
});
