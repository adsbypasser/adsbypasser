_.register({
  rule: {
    host: /^aka\.gr$/
  },
  async ready () {
    const l = $('iframe#yourls-frame');
    await $.openLink(l.src);
  },
});
