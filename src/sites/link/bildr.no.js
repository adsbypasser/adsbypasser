_.register({
  rule: 'http://bildr.no/view/*',
  async ready () {
    const i = $('img.bilde');
    await $.openLink(i.src);
  },
});
