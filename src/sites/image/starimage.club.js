_.register({
  rule: {
    host: /^starimage\.club$/,
    path: /^\/image\/.+$/,
  },
  async ready () {
    const i = $('input#embed-code-2.text-input').getAttribute('value');
    await $.openImage(i);
  },
});
