_.register({
  rule: {
    host: /^avenuexxx\.com$/,
  },
  async ready () {
    const i = $('#content img');
    await $.openImage(i.src);
  },
});
