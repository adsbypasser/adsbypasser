_.register({
  rule: 'http://www.bild.me/bild.php?file=*',
  async ready () {
    const i = $('#Bild');
    await $.openLink(i.src);
  },
});
