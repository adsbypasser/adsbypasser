_.register({
  rule: {
    host: /^www\.directupload\.eu$/,
  },
  async ready () {
    const i = $('meta[property="og:image"]');
    await $.openImage(i.content);
  },
});
