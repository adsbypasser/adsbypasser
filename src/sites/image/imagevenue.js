_.register({
  rule: [
    'https://*.imagevenue.com/*',
  ],
  async ready () {
    const i = $('a[title] img');
    await $.openImage(i.src);
  },
});
