_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: /^\/view\//,
  },
  async ready () {
    const i = $('#picContainer img');
    await $.openImage(i.src);
  },
});
