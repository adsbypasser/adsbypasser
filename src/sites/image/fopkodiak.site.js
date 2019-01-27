_.register({
  rule: {
    host: /^fopkodiak\.site$/,
  },
  async ready () {
    let img = $("head > link[rel=image_src]");
    await $.openImage(img.href);
  }
});
