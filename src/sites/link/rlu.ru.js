_.register({
  rule: {
    host: /^preview\.rlu\.ru$/,
  },
  async ready () {
    const a = $('#content > .long_url > a');
    await $.openLink(a.href);
  },
});
