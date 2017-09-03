_.register({
  rule: 'http://tinypic.com/view.php?pic=*',
  async ready () {
    const i = $('#imgElement');
    await $.openImage(i.src);
  },
});
