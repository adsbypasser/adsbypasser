_.register({
  rule: {
    host: /^pic(2profit|p2)\.com$/,
  },
  async ready () {
    const i = $('form > #d1 ~ input[name=bigimg]');
    await $.openImage(i.value);
  },
});
