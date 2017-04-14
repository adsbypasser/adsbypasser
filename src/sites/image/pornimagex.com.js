_.register({
  rule: {
    host: /^www\.pornimagex\.com$/,
    path: /^\/image\/.*$/,
  },
  async ready () {
    const img = $('#fixed img.border2px');
    await $.openImage(img.src);
  },
});
