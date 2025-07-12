_.register({
  rule: {
    host: /^fastpic\.org$/,
    path: /^\/view\//,
  },
  async ready () {
    const a = $('#imglink');
    await $.openLink(a.src);
  },
  async ready () {
    const i = $('.image');
    await $.openImage(i.src);
  },
});
