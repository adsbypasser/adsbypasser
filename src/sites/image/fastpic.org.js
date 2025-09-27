/**
 * @domain fastpic.org
 */
_.register({
  rule: {
    host: /^fastpic\.org$/,
  },
  async ready() {
    const img = $("img.image.img-fluid");
    await $.openImage(img.src);
  },
});
