_.register({
  rule: {
    host: /^www\.ryuugames\.com$/,
    query: /^\?eroge=/
  },
  async ready () {
    const ma = $('#wpsafe-link a');
    await $.openLink(ma.href);
  },
});
