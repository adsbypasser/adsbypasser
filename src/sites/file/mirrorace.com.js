_.register({
  rule: {
    host: /^mirrorace\.com$/,
    path: /^\/m\//,
  },
  async ready () {
    const ma = $('a.uk-button:nth-child(2)');
    await $.openLink(ma.href);
  },
});
