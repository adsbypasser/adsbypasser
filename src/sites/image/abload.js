_.register({
  rule: {
    host: [
      /^abload\.de$/,
      /^www\.imageup\.ru$/,
    ],
  },
  async ready () {
    const i = $('#image');
    await $.openImage(i.src);
  },
});
