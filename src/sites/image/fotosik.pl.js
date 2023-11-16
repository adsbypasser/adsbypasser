_.register({
  rule: 'https://www.fotosik.pl/*',
  async ready () {
    const i = $('#full-photo a img');
    await $.openImage(i.src);
  },
});
