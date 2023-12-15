_.register({
  rule: {
    host: /^picstate\.com$/,
    path: /^\/view\/full\/.*/,
  },
  async ready () {
    const i = $('#image_container a img');
    await $.openImage(i.src);
  },
});
