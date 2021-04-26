_.register({
  rule: {
    host: /^mirrorace\.(com|org)$/,
    path: /^\/m\/.+\/\d+/,
  },
  async ready () {
    const ma = $('a.uk-button:nth-child(2)');
    await $.openLink(ma.href);
  },
});
