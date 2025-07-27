_.register({
  rule: {
    host: /^javtele\.net$/,
  },
  async ready () {
    const i = $('#fileOriginalModal img');
    await $.openImage(i.src);
  },
});
