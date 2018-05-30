_.register({
  rule: {
    host: /^www\.2i\.(sk|cz)$/,
  },
  async ready () {
    const img = $('#wrap3 img');
    await $.openImage(img.src);
  },
});
