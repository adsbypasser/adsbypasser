_.register({
  rule: [
    'https://*.imagevenue.com/view/o/?*',
  ],
  async ready () {
    const i = $('a[title] img');
    await $.openImage(i.src);
  },
});
