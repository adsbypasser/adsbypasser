_.register({
  rule: {
    host: [
      /^ur\.ly$/,
      /^urly\.mobi$/,
    ],
    path: /^\/x(.+)/,
  },
  async ready () {
    const path = window.location.href.replace('/x', '/goii/');
    await $.openLink(path);
  }
});
