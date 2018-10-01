_.register({
  rule: {
    host: /^picstate\.com$/,
  },
  async ready () {
    const i = $('#image_container img');
    await $.openImage(i.src);
  },
});
