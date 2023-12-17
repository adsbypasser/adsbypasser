_.register({
  rule: {
    host: /^imageupper\.com$/,
  },
  async ready () {
    const i = $('#img');
    await $.openImage(i.src);
  },
});
