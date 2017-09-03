_.register({
  rule: 'http://picmoe.net/d.php?id=*',
  async ready () {
    const i = $('img');
    await $.openImage(i.src);
  },
});
