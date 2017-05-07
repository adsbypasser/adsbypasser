_.register({
  rule: {
    host: /^cf\.ly$/,
    path: /^\/[^/]+$/,
  },
  async start (m) {
    $.remove('iframe');
    await $.openLink('/skip' + m.path[0]);
  },
});
