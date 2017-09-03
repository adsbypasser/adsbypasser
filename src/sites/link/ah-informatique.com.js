_.register({
  rule: {
    host: /^(www\.)?ah-informatique\.com$/,
    path: /^\/ZipUrl/,
  },
  async ready () {
    const a = $('#zip3 a');
    await $.openLink(a.href);
  },
});
