_.register({
  rule: {
    host: /^gamemod\.pro$/,
    path: /^\/download-file\//,
  },
  async ready () {
    const gp = $('#wait-done > p > a');
    await $.openLink(gp.href);
  },
});
