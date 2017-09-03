_.register({
  rule: 'http://www.fotolink.su/v.php?id=*',
  async ready () {
    const i = $('#content img');
    await $.openImage(i.src);
  },
});
