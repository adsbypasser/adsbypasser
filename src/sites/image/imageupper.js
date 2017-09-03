_.register({
  rule: 'http://imageupper.com/i/?*',
  async ready () {
    const i = $('#img');
    await $.openImage(i.src);
  },
});
