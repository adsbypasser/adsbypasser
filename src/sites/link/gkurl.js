_.register({
  rule: {
    host: /^gkurl\.us$/,
  },
  async ready () {
    const iframe = $('#gkurl-frame');
    await $.openLink(iframe.src);
  },
});
