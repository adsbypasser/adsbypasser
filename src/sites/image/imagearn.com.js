_.register({
  rule: 'http://imagearn.com/image.php?id=*',
  async ready () {
    const i = $('#img');
    await $.openImage(i.src);
  },
});
