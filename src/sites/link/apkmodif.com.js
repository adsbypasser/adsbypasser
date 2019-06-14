_.register({
  rule: {
    host: /^apkmodif\.com$/,
  },
  async ready () {
    const a = $('[name="geturl"]').getAttribute('value');
    await $.openLink(a);
  },
});
