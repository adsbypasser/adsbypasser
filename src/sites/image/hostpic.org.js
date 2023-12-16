_.register({
  rule: {
    host: /^www\.hostpic\.org$/,
  },
  async ready() {
    const i = $('#photo');
    await $.openImage(i.src);
  },
});
