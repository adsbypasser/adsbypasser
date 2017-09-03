_.register({
  rule: {
    host: /^www\.(2i\.(sk|cz)|2imgs\.com)$/,
  },
  async ready () {
    const img = $('#wrap3 img');
    await $.openImage(img.src);
  },
});
