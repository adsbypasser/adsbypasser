_.register({
  rule: {
    host: /^abload\.de$/,
  },
  async ready () {
    const i = $('#image');
    await $.openImage(i.src);
  },
});
