/**
 * @domain pixxxels.cc
 * @domain postimg.cc
 */
_.register({
  rule: {
    host: [/^pixxxels\.cc$/, /^postimg\.cc$/],
  },
  async ready() {
    const img = $(".img-fluid");
    await $.openImage(img.src);
  },
});
