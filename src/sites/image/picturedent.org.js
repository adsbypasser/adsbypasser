_.register({
  rule: {
    host: [
      /^picturedent\.org$/,
      /^everest\.picturedent\.org$/,
      /^pacific\.picturedent\.org$/,
    ],
    path: /^\/image\//,
  },
  async ready() {
    const i = $("#full_img");
    await $.openImage(i.src);
  },
});
