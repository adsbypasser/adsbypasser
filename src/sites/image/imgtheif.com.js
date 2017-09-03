_.register({
  rule: 'http://imgtheif.com/image/*.html',
  async ready () {
    const a = $('div.content-container a');
    await $.openImage(a.href);
  },
});
