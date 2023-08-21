_.register({
  rule: [
    'https://*.imagevenue.com/*',
  ],
  async ready () {
    const i = $('img#main-image');
    await $.openImage(i.src);
  },
});
