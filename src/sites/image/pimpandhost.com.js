_.register({
  rule: {
    host: /^(www\.)?pimpandhost\.com$/,
    path: /^\/image\//,
  },
  async ready () {
    const img = $('#overflow-wrapper img.original');
    await $.openImage(img.src);
  },
});
