_.register({
  rule: {
    host: /^www\.imagenetz\.de$/,
  },
  async ready () {
    const img = $('.img-rounded.img-responsive');
    await $.openImage(img.src);
  },
});
