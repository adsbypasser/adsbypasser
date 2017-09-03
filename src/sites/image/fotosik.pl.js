_.register({
  rule: 'http://www.fotosik.pl/pokaz_obrazek/pelny/*.html',
  async ready () {
    const i = $('a.noborder img');
    await $.openImage(i.src);
  },
});
