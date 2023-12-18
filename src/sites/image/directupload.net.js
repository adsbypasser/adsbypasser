_.register({
  rule: {
    host: /^www\.directupload\.net$/,
  },
  async ready () {
    const i = $('#ImgFrame');
    await $.openImage(i.src);
  },
});
