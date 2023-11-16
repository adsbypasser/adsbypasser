_.register({
  rule: 'https://ipic.su/?page=img&pic=*',
  async ready () {
    const i = $('#fz');
    await $.openImage(i.src);
  },
});
