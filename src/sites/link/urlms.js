_.register({
  rule: {
    host: /^urlms\.com$/,
  },
  async ready () {
    const iframe = $('#content');
    await $.openLink(iframe.src);
  },
});
