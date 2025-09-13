_.register({
  rule: {
    host: /^imageup\.ru$/,
  },
  async ready() {
    const i = $("#image");
    await $.openImage(i.src);
  },
});
