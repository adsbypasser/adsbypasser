_.register({
  rule: {
    host: /^i\.javtor\.com$/,
    path: /^\/image\//,
  },
  async ready () {
    const i = $('#show_img img');
    await $.openImage(i.src);
  },
});
