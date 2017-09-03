_.register({
  rule: {
    host: /^imagezilla\.net$/,
  },
  async ready () {
    const i = $('#photo');
    await $.openImage(i.src, {
      referer: true,
    });
  },
});
