_.register({
  rule: {
    host: /^vavi\.co$/,
  },
  async ready () {
    const l = $('#goLink');
    await $.openLink(l.href);
  },
});
