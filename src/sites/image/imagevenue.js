_.register({
  rule: [
    'https://*.imagevenue.com/*',
  ],
  async ready () {
    const i = $('a[title] img#main-image');
    await $.openImage(i.src);
  },
});
