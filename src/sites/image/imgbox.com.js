_.register({
  rule: {
    host: /^imgbox\.com$/,
    path: /^\/[\d\w]+$/,
  },
  async ready () {
    $.remove('iframe');
    const i = $('#img');
    await $.openImage(i.src);
  },
});
