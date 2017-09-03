_.register({
  rule: {
    host: /^crd\.ht$/,
  },
  async ready () {
    const i = $('.continue > form > input[name=link]');
    await $.openImage(i.value);
  },
});
