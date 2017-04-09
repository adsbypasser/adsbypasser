_.register({
  rule: 'http://vvcap.net/db/*.htp',
  async ready () {
    const i = $('img');
    await $.openImage(i.src, {
      replace: true,
    });
  },
});
