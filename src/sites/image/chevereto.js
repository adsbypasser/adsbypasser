_.register({
  rule: 'http://javelite.tk/viewer.php?id=*',
  async ready () {
    const i = $('table img');
    await $.openImage(i.src);
  },
});
