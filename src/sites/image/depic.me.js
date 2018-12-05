_.register({
  rule: {
    host: /^depic\.me$/,
  },
  async ready () {
    const i = $('#pic');
    await $.openImage(i.src);
  },
});
