_.register({
  rule: 'http://www.subirimagenes.com/*.html',
  async ready () {
    const i = $('#ImagenVisualizada');
    await $.openImage(i.src);
  },
});
