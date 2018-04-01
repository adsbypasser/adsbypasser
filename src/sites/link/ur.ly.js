_.register({
  rule: {
    host: /^ur\.ly$/,
  },
  async ready () {
    const path = window.location.href.replace('http://ur.ly/x', 'http://ur.ly/goii/');
    await $.openLink(path);
  },
});
