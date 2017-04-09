_.register({
  rule: {
    host: /^ima\.so$/,
  },
  async ready () {
    const a = $('#image_block a');
    await $.openImage(a.href);
  },
});
