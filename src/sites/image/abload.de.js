_.register({
  rule: {
    host: [
      /^abload\.de$/,
      /^imageup\.ru$/,
    ],
  },
  async ready () {
    const i = $('#image');
    await $.openImage(i.src);
  },
});
