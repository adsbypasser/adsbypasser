_.register({
  rule: {
    host: /^(www\.)?freeimgup\.com$/,
    path: /^\/xxx\//,
  },
  async ready () {
    const img = $('#mainimage');
    await $.openImage(img.src);
  },
});
